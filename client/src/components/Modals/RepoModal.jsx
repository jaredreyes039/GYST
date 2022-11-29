import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { close_repo_modal } from '../../slices/repoModalDisplay'
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GitHubIcon from '@mui/icons-material/GitHub';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function RepoModal(props){

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

    const {isLoading, isSuccess, data, isError} = useQuery(['repocontents'], ()=>{
        return axios
            .get(`https://api.github.com/repos/${props.owner}/${props.title}/contents`, {
                headers: {
                    "Authorization" : "token " + props.token
                }
            })
    }, {enabled: isAutoFetching, refetchOnMount: true, retry: false})

    if(isLoading){
        return(
            <div style={{opacity: props.opacity, display: props.display}} className='modal'>
                <h1 className='repo-title'>Loading repo...</h1>
            <button onClick={()=>dispatch(close_repo_modal())} className='close-modal'><strong>X</strong></button>
        </div>
        )
    }
    if(isSuccess){
        return(
            <div style={{opacity: props.opacity, display: props.display}} className='repo-modal'>
            <h1 className='repo-title'>{props.title}</h1>
            <p className='desc'>{props.repo_desc}</p>
            <p className='owner'><strong>Owner</strong>: {props.owner}</p>
            <p className='updated'><strong>Updated At</strong>: {props.updated}</p>
            <div icontype="Forks" className='icon'>
                <ForkLeftIcon />
                <p>{props.forks}</p>
            </div>
            <div icontype="Default Branch" className='icon'>
                <AccountTreeIcon />
                <p>{props.default_branch}</p>
            </div>
            <div className='contents-container'>
                    <ul>
                    {data.data !== undefined? data.data.map((file)=> {return(
                        <div className='file'>
                            <div className='sqr-gray'>
                                <h3>{file.name !== undefined && file.name.toString().includes(".") ? "FILE" : "DIR" }</h3>
                            </div>
                            <div className='file-data'>
                                <h3>{file.name !== undefined && file.name.toString().includes(".") ? file.name : `/${file.name}`}</h3>
                                <div className='file-link'><FileDownloadIcon /><a href={file.download_url || "#"} download>{file.download_url ? "Source Code" : "Source Code Unavailable"}</a></div>
                                <div className='file-link'><GitHubIcon /><a href={file.html_url || "#"} download>{file.html_url ? "Github" : "Github Link Unavailable"}</a></div>
                            </div>
                        </div>
                    )}):""}
                    </ul>
                </div>
            <h2 className='label'>Commit History</h2>
            <div className='commits-container'>
                <ul className='commits-list'>
                    {
                        props.commits[0].map((commit)=>{
                            return(
                                <>
                                <li className='commit'>
                                    <div className='titleblock'>
                                        <h2>{commit.commit.message}</h2>
                                    </div>
                                    <div className='commit-data'>
                                    <img src={commit.author.avatar_url} alt={commit.author.login}></img>
                                    <div>
                                    <p><strong>Author</strong>: {commit.author.login}</p>
                                    <p><strong>Email</strong>: {commit.commit.author.email}</p>
                                    <p><strong>Committed</strong>: {new Date(commit.commit.author.date).toLocaleString()}</p>
                                    </div>
                                    </div>
                                </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
            <button onClick={()=>dispatch(close_repo_modal())} className='close-modal'><strong>X</strong></button>
        </div>
        )
    }
    if (isError)(
        <div style={{opacity: props.opacity, display: props.display}} className='modal'>
            <h1>Error: Failed to load repo. Please, reload the page, or try again later!</h1>
            <button onClick={()=>dispatch(close_repo_modal())} className='close-modal'><strong>X</strong></button>
        </div>
    )
}
