import IssuesBody from "./IssuesBody";
import IssuesHead from "./IssuesHead";
import '../../styles/component_styles/issue_styles/issue_container.scss'

export default function IssuesContainer(){
    return (
        <div className = 'issue-container'>
            <IssuesHead></IssuesHead>
            <IssuesBody></IssuesBody>
        </div>
    )
}