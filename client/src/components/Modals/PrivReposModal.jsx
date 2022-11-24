import {useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GitHubIcon from '@mui/icons-material/GitHub';
import { close_priv_repo_modal } from '../../slices/privRepoModalDisplay'
import { CookieParser } from '../lib/cookieParser'
import { show_repo_modal } from '../../slices/repoModalDisplay'

export default function PrivReposModal(props){

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
                <h1>Loading private repos...</h1>
                <button onClick={()=>dispatch(close_priv_repo_modal())} className='close-modal'><strong>X</strong></button>
            </div>
        )
    }
    if(isSuccess){
        return(
            <div style={{opacity: props.opacity, display: props.display}} className='modal'>
                <h1>Private Repos</h1>
                <ul className='pubrepos-list'>
                    {data.data.repo_data ? data.data.repo_data.filter((repo)=>{
                        return repo.private === true
                    }).map((privRepo)=>{
                        let issueArrLength = privRepo.open_issues;
                        return(
                            <>
                            <div className='pubrepo' onClick={()=>{axios
                                        .get(`https://api.github.com/repos/${privRepo.owner.login}/${privRepo.name}/commits`, {headers: {
                                            "Authorization" : "token " + data.data.token
                                        }})
                                        .then((res)=>dispatch(show_repo_modal({
                                        display: "block",
                                        repo_title: privRepo.name,
                                        commits: [res.data],
                                        default_branch: privRepo.default_branch,
                                        forks: privRepo.forks_count,
                                        last_updated: new Date(privRepo.updated_at).toLocaleString(),
                                        open_issues: issueArrLength,
                                        private: privRepo.private,
                                        repo_owner: privRepo.owner.login,
                                        size: privRepo.size,
                                        watchers_count: privRepo.watchers_count,
                                        repo_description: privRepo.description,
                                        }))).finally(()=>{dispatch(close_priv_repo_modal())})}}>
                                <h2>{privRepo.name}</h2>
                                <div><AccountTreeIcon /><p>{privRepo.default_branch}</p></div>
                                <div><GitHubIcon /><a href={privRepo.html_url || "#"}>{privRepo.html_url ? "View on Github" : "Github link unavailable"}</a></div>
                                <p><strong>Owner</strong>: {privRepo.owner.login === data.data.user ? "You" : privRepo.owner.login}</p>
                                <p><strong>Last Updated</strong>: {new Date(privRepo.updated_at).toLocaleString()}</p>
                                <p>{privRepo.description === null ? "No Description" : privRepo.description}</p>
                            </div>
                            <hr></hr>
                            </>
                        )
                    }) : ""}
                </ul>
                <button onClick={()=>dispatch(close_priv_repo_modal())} className='close-modal'><strong>X</strong></button>
            </div>
        )
    }
    if(isError)(
        <div style={{opacity: props.opacity, display: props.display}} className='modal'>
            <h1>Error: Failed to load private repos. Please, reload the page, or try again later!</h1>
            <button onClick={()=>dispatch(close_priv_repo_modal())} className='close-modal'><strong>X</strong></button>
        </div>
    )
}
