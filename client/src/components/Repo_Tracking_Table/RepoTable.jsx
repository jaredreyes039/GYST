import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {show_repo_modal} from '../../slices/repoModalDisplay.js'
import { CookieParser } from "../lib/cookieParser.js";

export default function RepoTable(){

    const dispatch = useDispatch()

    const {isLoading, data, isSuccess, isError} = useQuery(['repos'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    })

    if(isLoading){
        return (
            <div className='repo-table-container' style={{padding: '32px'}}>
                <h1>Loading Repo Data...</h1>
            </div>
        )
    }

    if(isSuccess){

        async function getWatchers(){
            let watchersArr = await data.data.repo_data? data.data.repo_data.map((repo)=>{
                return(repo.watchers)
            }) : "";
            if(!window.localStorage.getItem("watchersHistory")){
                window.localStorage.setItem("watchersHistory", watchersArr)
            }
            setInterval(()=>{
                window.localStorage.setItem("watchersHistory", watchersArr)
            }, 12000)
        }

        getWatchers()

        let watchersHistoryArr = window.localStorage.getItem("watchersHistory") ? window.localStorage.getItem("watchersHistory").split(",") : []

        return(
            <div className='repo-table-container'>
                <table className='repo-table-main'>
                    <thead>
                        <tr>
                            <th>Repo</th>
                            <th>Owner</th>
                            <th>Last Updated</th>
                            <th>Forks</th>
                            <th>Open Issues</th>
                            <th>Watching</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.data.repo_data ? data.data.repo_data.map((repo, idx)=>{
                                let issueArrLength = repo.open_issues;
                                return(
                                    <>
                                    <tr onClick={()=>{axios
                                        .get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`, {headers: {
                                            "Authorization" : "token " + data.data.token
                                        }})
                                        .then((res)=>dispatch(show_repo_modal({
                                        display: "block",
                                        repo_title: repo.name,
                                        commits: [res.data],
                                        default_branch: repo.default_branch,
                                        forks: repo.forks_count,
                                        last_updated: new Date(repo.updated_at).toLocaleString(),
                                        open_issues: issueArrLength,
                                        private: repo.private,
                                        repo_owner: repo.owner.login,
                                        size: repo.size,
                                        watchers_count: repo.watchers_count,
                                        repo_description: repo.description,
                                        })))}}>
                                        <td>{repo.name}</td>
                                        <td>{repo.owner.login === data.data.user ? "You" : repo.owner.login}</td>
                                        <td>{repo.updated_at? new Date(repo.updated_at).toLocaleDateString() : 'N/A'}</td>
                                        <td>{repo.forks_count}</td>
                                        <td style={{backgroundColor: issueArrLength > 0 ? "	#e74c3c" : "initial", color: issueArrLength > 0 ? "#eeeeee" : "2c3e50"}}>{repo.open_issues}</td>
                                        <td style={{
                                            backgroundColor: repo.watchers_count > watchersHistoryArr[idx] ? "#7ccc63" : repo.watchers_count > 0 ? "	#f39c12" : ""
                                        }}>{repo.watchers_count}</td>
                                    </tr>
                                    </>
                                )
                            }) : <tr>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                </tr>}
                    </tbody>
                </table>
            </div>

        )
    }

    if (isError){
        return (
            <div className="repo-table-container" style={{padding: '32px'}}>
                <h1>Error: Failed to load repo data...</h1>
            </div>
        )
    }
}