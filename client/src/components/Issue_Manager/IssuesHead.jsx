import { useState, useEffect, useContext } from "react"

export default function IssuesHead(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [repoList, setRepoList] = useState([])

    const fetchgit = async () => {
        let fetchData = await fetch (`http://localhost:5000/user/jaredreyes039`)
            .then(res=>res.json())
            .then(data=>{return(data)})
        setGitData(fetchData)
    }

    useEffect(()=>{
        fetchgit();
        setIsLoading(false)
    }, [])


    useEffect(()=>{
        if(gitData && gitData.repo_data){
            setRepoList(gitData.repo_data.map((repo)=>{
                return <option>{repo.name}</option>
            }))
        }
        else{
            setRepoList(<option>Loading...</option>)
        }
    }, [gitData, isLoading])

    return(
        <div className = 'issue-head'>
            <p>Select a Repo: </p>
            <select>
                {repoList}
            </select>
        </div>
    )
}