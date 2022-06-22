import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react'
import '../../styles/components/repotracker/repotrackcontainer.scss'
import RepoFileDisp from './repoFileDisp';
import RepoLang from './repoLanguageDisp';

export default function RepoTrackerContainer(){        
    const [gitdata, setGitData] = useState([])
    async function fetchgit(){
        const data = await fetch('/gitdata', {
          method: 'GET',
      }).then(res=> res.json()).then(data => {return(data)})
      setGitData(data)
   }
   
         useEffect(()=>{
            fetchgit()
           }, [])

    return(
        <>
            <div className="repotrack-container">
                <div className="repotracker">
                <h2>Repository List</h2>
                <p>A view of all your repos specifiying the description, update and push dates,
                    default branch, and users watching.
                </p>
                {gitdata.map(repo => {
                    return(
                            <ul className = 'repo-data-list'>
                                <li><h3>{repo.name.toUpperCase()}</h3></li>
                                <li><span className = 'desc'>Description:</span><br></br> {repo.description || 'N/A'}</li>
                                <li><span className = 'push'>Last Pushed:</span><br></br> {repo.pushed_at || 'N/A'}</li>
                                <li><span className = 'updated'>Last Updated:</span><br></br> {repo.updated_at || 'N/A'}</li>
                                <li><span className = 'branch'>Default Branch:</span><br></br> {repo.default_branch || 'N/A'}</li>
                                <li><span className = 'watching'>Watching:</span><br></br> {repo.watchers_count}</li>
                            </ul>
                    )
                })}
                </div>
                <RepoFileDisp />
                <RepoLang />
            </div>
        </>
    )
}