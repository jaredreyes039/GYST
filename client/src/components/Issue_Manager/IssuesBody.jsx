import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { marked } from 'marked'
import { Markup } from 'interweave';
import { useDispatch } from 'react-redux';
import { show_issue_modal } from '../../slices/issueModalDisplay';
import { close_issue_list_modal } from '../../slices/issueListModalDisplay';
import { CookieParser } from '../lib/cookieParser';


export default function IssuesBody(){

    const dispatch = useDispatch()

    const {isLoading, data, isSuccess, isError} = useQuery(['repos'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    })

   if(isLoading){
    return(
        <>
            <h1>Loading Assigned Issues...</h1>
        </>
    )
   }
   if (isSuccess){
    if(data.data.issue_data !== undefined && data.data.issue_data.length > 0){
    return(
        <ul>
            {data.data.issue_data.map((issue)=>{
                let parsedBody = "No Parsed Body"
                if(issue.body){
                    parsedBody = marked.parse(issue.body)
                }
                return(
                    <>
                    <li onClick={()=>{axios
                                        .get(issue.comments_url, {headers: {
                                            "Authorization" : "token " + data.data.token
                                        }})
                                        .then((res)=>{dispatch(show_issue_modal({
                        title:issue.title,
                        assignees: issue.assignees ? issue.assignees.map((assignee)=>{return assignee.login + " "}) : "No Assignees Listed",
                        body: parsedBody,
                        reactions: issue.reactions,
                        comments: res.data,
                        user_data: {
                            login: issue.user.login,
                            created_at: issue.created_at,
                            state: issue.state,
                            avatar_url: issue.user.avatar_url
                        }
                    }))}).finally(()=>{
                        dispatch(close_issue_list_modal())
                    })}}>

                        <div title={"assigned issue"} className='issue'>
                            <h1 className='issue-title'>{issue.title}</h1>
                            <p className='assignees'><strong>Assignees</strong>: {issue.assignees ? issue.assignees.map((assignee)=>{return assignee.login + " "}) : "No Assignees Listed"}</p>
                            <Markup content={parsedBody}></Markup>
                        </div>

                    </li>
                    <hr></hr>
                    </>
                )
            })}
        </ul>
    )
        }
        else{
            return(
                <ul>
                    <li>
                        <div title={"assigned issue"} className='issue'>
                            <h1>No currently assigned issues! Time to celebrate, maybe some wine? </h1>
                        </div>
                    </li>
                </ul>
            )
        }
   }
   if (isError){
    return(
        <>
            <ul>
                <li>
                    <div className='issue'>
                        <h1 className='issue-title'>
                            Failed to load assigned issues.
                        </h1>
                    </div>
                </li>
            </ul>
        </>
    )
   }
}
