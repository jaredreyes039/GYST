import { Markup } from 'interweave'
import { useDispatch } from 'react-redux'
import { close_issue_modal } from '../../slices/issueModalDisplay'
import LooksOneIcon from '@mui/icons-material/LooksOne';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CelebrationIcon from '@mui/icons-material/Celebration';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { marked } from 'marked'

export default function IssueModal(props){

    const dispatch = useDispatch()

    return(
        <div style={{opacity: props.opacity, display: props.display}} className='issue-modal'>
            <h1 className='issue-title'>{props.title}</h1>
            <p><strong>Assignees</strong>: {props.assignees}</p>
            <p><strong>Comments</strong>: {props.comments ? props.comments.length : "None"}</p>
            <h2 className='label'>Issue</h2>
            <div className='issue-body-container'>
            <UserBlock mainIssue={props.user_data} />
            <div className='issue-body'>
                <Markup content={props.body}></Markup>
            </div>
            </div>
            <h2 className='label'>Reactions</h2>
            <Reactions className='reactions' reactions={props.reactions}></Reactions>
            <h2 className='label'>Comments</h2>
            <div className='comments-container'>
                <ul>
                    {props.comments.length > 0 ? props.comments.map((comment)=>{
                        return(
                            <li className='comment'>
                                <div>
                                <UserBlock comment = {comment} />
                                <div className='comment-body'>
                                <Markup content={marked.parse(comment.body)}></Markup>
                                </div>
                                <Reactions className='comment-reactions' reactions={comment.reactions} />
                                </div>
                            </li>
                        )
                    }) : <div className='comment-body'><p>No Comments Posted</p></div>}
                </ul>
            </div>
            <button onClick={()=>dispatch(close_issue_modal())} className='close-modal'><strong>X</strong></button>
        </div>
    )
}

export function Reactions(props){
    return(
        <ul className={props.className}>
            <li rxn_count={props.reactions["+1"]} reaction_type="+1">
                <div><LooksOneIcon style={{color: '#7ccc63'}} /></div>
                <p>{props.reactions["+1"]}</p>
            </li>
            <li rxn_count={props.reactions["-1"]} reaction_type="-1">
                <div><LooksOneIcon style={{color: '#e74c3c'}} /></div>
                <p>{props.reactions["-1"]}</p>
            </li>
            <li rxn_count={props.reactions["confused"]} reaction_type="Confused">
                <div><FmdBadIcon style={{color: '#f39c12'}} /></div>
                <p>{props.reactions["confused"]}</p>
            </li>
            <li rxn_count={props.reactions["eyes"]} reaction_type="Eyes">
                <div><RemoveRedEyeIcon style={{color: '#7ccc63'}} /></div>
                <p>{props.reactions["eyes"]}</p>
            </li>
            <li rxn_count={props.reactions["heart"]} reaction_type="Heart">
                <div><FavoriteIcon style={{color: '#e74c3c'}} /></div>
                <p>{props.reactions["heart"]}</p>
            </li>
            <li rxn_count={props.reactions["hooray"]} reaction_type="Hooray">
                <div><CelebrationIcon style={{color: '#f39c12'}} /></div>
                <p>{props.reactions["hooray"]}</p>
            </li>
            <li rxn_count={props.reactions["laugh"]} reaction_type="Laugh">
                <div><InsertEmoticonIcon style={{color: '#f39c12'}} /></div>
                <p>{props.reactions["laugh"]}</p>
            </li>
            <li rxn_count={props.reactions["rocket"]} reaction_type="Rocket">
                <div><RocketLaunchIcon style={{color: 'black'}} /></div>
                <p>{props.reactions["rocket"]}</p>
            </li>
        </ul>
    )
}

export function UserBlock(props){
    if(props.comment && !props.mainIssue){
        return(
            <div className='user-post-data'>
                <img src={props.comment.user.avatar_url} href={props.comment.user.login}></img>
                <div>
                    <p className='username'>{props.comment.user.login.charAt(0).toUpperCase() + props.comment.user.login.slice(1).toLowerCase()}</p>
                    <p className='created'><strong>Date Posted</strong>: {new Date(props.comment.created_at).toLocaleString()}</p>
                    <p className='association'><strong>Association</strong>: {props.comment.author_association.charAt(0).toUpperCase() + props.comment.author_association.slice(1).toLowerCase()}</p>
                    <p className='comment-reactions-count'><strong>Reactions</strong>: {props.comment.reactions.total_count}</p>
                </div>
            </div>
        )
    }
    if(props.mainIssue && !props.comment){
        return(
            <div className='user-post-data'>
            <img src={props.mainIssue.avatar_url} href={props.mainIssue.login}></img>
            <div>
                <p className='username'>{props.mainIssue.login.charAt(0).toUpperCase() + props.mainIssue.login.slice(1).toLowerCase()}</p>
                <p className='created'><strong>Date Posted</strong>: {new Date(props.mainIssue.created_at).toLocaleString()}</p>
                <p className='state'><strong>State</strong>: <span style={{color: props.mainIssue.state === 'open' ? "#7ccc63" : "#e74c3c"}}>{props.mainIssue.state}</span></p>
            </div>
        </div>
        )
    }

}
