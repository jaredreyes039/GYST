import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { close_pub_repo_modal } from '../../slices/pubRepoModalDisplay'
import { show_repo_modal } from '../../slices/repoModalDisplay'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GitHubIcon from '@mui/icons-material/GitHub';
import { CookieParser } from '../lib/cookieParser'

export default function PubReposModal(props){

    const [isAutoFetching, setIsAutoFetching] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(props.display !== "none"){
            setIsAutoFetching(true)
        }
        else {
            setIsAutoFetching(false)
        }
    }, [props.display])

    const {isLoading, data, isSuccess, isError} = useQuery(['repos'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    }, {enabled: isAutoFetching, retry: false})

    if(isLoading){
        return(
            <div style={{opacity: props.opacity, display: props.display}} className='modal'>
                <h1>Loading public repos...</h1>
                <button onClick={()=>dispatch(close_pub_repo_modal())} className='close-modal'><strong>X</strong></button>
            </div>
        )
    }
    if(isSuccess){
        return(
            <div style={{opacity: props.opacity, display: props.display}} className='modal'>
                <h1>Public Repos</h1>
                <ul className='pubrepos-list'>
                    {data.data.repo_data ? data.data.repo_data.filter((repo)=>{
                        return repo.private === false
                    }).map((pubRepo)=>{
                        let issueArrLength = pubRepo.open_issues;
                        return(
                            <>
                            <div className='pubrepo' onClick={()=>{axios
                                        .get(`https://api.github.com/repos/${pubRepo.owner.login}/${pubRepo.name}/commits`, {headers: {
                                            "Authorization" : "token " + data.data.token
                                        }})
                                        .then((res)=>dispatch(show_repo_modal({
                                        display: "block",
                                        repo_title: pubRepo.name,
                                        commits: [res.data],
                                        default_branch: pubRepo.default_branch,
                                        forks: pubRepo.forks_count,
                                        last_updated: new Date(pubRepo.updated_at).toLocaleString(),
                                        open_issues: issueArrLength,
                                        private: pubRepo.private,
                                        repo_owner: pubRepo.owner.login,
                                        size: pubRepo.size,
                                        watchers_count: pubRepo.watchers_count,
                                        repo_description: pubRepo.description,
                                        }))).finally(()=>{dispatch(close_pub_repo_modal())})}}>
                                <h2>{pubRepo.name}</h2>
                                <div><AccountTreeIcon /><p>{pubRepo.default_branch}</p></div>
                                <div><GitHubIcon /><a href={pubRepo.html_url}>See on Github</a></div>
                                <p><strong>Owner</strong>: {pubRepo.owner.login === data.data.user ? "You" : pubRepo.owner.login}</p>
                                <p><strong>Last Updated</strong>: {new Date(pubRepo.updated_at).toLocaleString()}</p>
                                <p>{pubRepo.description}</p>
                            </div>
                            <hr></hr>
                            </>
                        )
                    }) : ""}
                </ul>
                <button onClick={()=>dispatch(close_pub_repo_modal())} className='close-modal'><strong>X</strong></button>
            </div>
        )
    }
    if (isError)(
        <div style={{opacity: props.opacity, display: props.display}} className='modal'>
            <h1>Error: Failed to load public repos. Please, reload the page, or try again later!</h1>
            <button onClick={()=>dispatch(close_pub_repo_modal())} className='close-modal'><strong>X</strong></button>
        </div>
    )
}
