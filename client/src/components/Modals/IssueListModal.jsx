import { useDispatch } from 'react-redux'
import { close_issue_list_modal } from '../../slices/issueListModalDisplay'
import IssuesContainer from '../Issue_Manager/IssuesContainer'


export default function IssueListModal(props){
    
    const dispatch = useDispatch()

    return (
        <div style={{display: props.display, opacity: props.opacity}} className="issue-list-modal">
            <IssuesContainer />
            <button onClick={()=>dispatch(close_issue_list_modal())} className='close-modal'><strong>X</strong></button>
        </div>
    )
}
