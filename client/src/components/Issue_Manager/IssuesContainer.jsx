import IssuesBody from "./IssuesBody";
import IssuesHead from "./IssuesHead";
import '../../styles/component_styles/issue_styles/issue_container.scss'

export default function IssuesContainer(){
    return (
        <div className="issue">
        <div className = 'issue-container'>
            <IssuesBody></IssuesBody>
        </div>
        </div>
    )
}