import {useState, useEffect} from 'react';

export default function IssuesBody(){
    const [isLoading, setIsLoading] = useState(true);
    const [issueData, setIssueData] = useState([])
    const [listIssues, setListIssues] = useState("")

    function check_cookie_name(name) 
    {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) {
        return(match[2]);
      }
      else{
           return('--something went wrong---');
      }
   }

    const fetchgit = async () => {
        let session = await check_cookie_name("USRCDE");
        let fetchData = await fetch (`/user/${session}`)
            .then(res=>res.json())
            .then(data=>{return(data.issue_data)})
        setIssueData(fetchData)
    }

    useEffect(()=>{
        fetchgit();
        setIsLoading(false)
    }, [])
    console.log()

    useEffect(()=>{
        const err = <p>Failed to load issues, check your connection and try again. If this error persists, file an issue at<a href = "www.github.com/jaredreyes039/DevDash">www.github.com/jaredreyes039/DevDash</a></p>
        if(!isLoading){
            if(issueData.length > 0 && issueData !== null){
            setListIssues(
                <ul className = 'issuelist-container'>
                    {issueData.map((issue, idx) => {
                        return(
                            <li name = {`listitem${issue.number}`} className='issuelist-item'>
                                <label htmlFor='listitem'><strong><a href = {issue.html_url}>Issue # {issue.number}: {issue.repository.name}</a></strong></label>
                                <hr></hr>
                                    <li>{issue.title}</li>
                                    <li><strong>Assignees:</strong> {issue.assignees.length}</li>
                                    <li><strong>Comments:</strong> {issue.comments}</li>
                                    <li><strong>Updated At: </strong>{new Date(issue.updated_at).toLocaleString()}</li>
                                    <li><strong>Labels: </strong>{issue.labels ? issue.labels.map((lbl)=>{return " | " + lbl.name + " | "}) : "No Labels Assigned"}</li>
                                    <li><strong>Milestone: </strong>{issue.milestone ? issue.milestone.title : "No Milestone Assigned"}</li>

                            </li>
                            )
                    })}
                </ul>
            )}
            else{
                setListIssues("Loading Issues...")
            }
        }
        setTimeout(()=>{
            if(issueData === undefined || null){
                setListIssues(err)
            }
        }, 2500)
    }, [isLoading, issueData])


    
    return(
        <>
            {listIssues}
        </>
    )
}