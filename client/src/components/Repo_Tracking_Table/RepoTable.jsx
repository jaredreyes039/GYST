import { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/component_styles/table_styles/table_main.scss';


export default function RepoTable(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dispState, setDispState] = useState("");

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
        fetch (`http://localhost:5000/user/${session}`)
            .then(res=>res.json())
            .then(data => setGitData(data))
            .finally(()=>setIsLoading(false))
    }
    useEffect(()=>{
        fetchgit();
    }, [])

    useEffect(()=>{
        if(isLoading){
            setDispState(<tr>
                            <td>Loading Repo Names...</td>
                            <td>Loading Update Dates...</td>
                            <td>Loading Owners...</td>
                            <td>Loading Issues...</td>
                            <td>Loading Links...</td>
                            <td>Loading Watchers...</td>
                        </tr>)
        } 
        else if (gitData && gitData.repo_data){
            setDispState(gitData.repo_data.map((repo)=>{
                return(
                    <tr>
                        <td>{`${repo.name.toString().charAt(0).toUpperCase()}`+`${repo.name.toString().slice(1)}`}</td>
                        <td>{new Date(repo.updated_at).toLocaleString()}</td>
                        <td>{`${repo.owner.login.toString().charAt(0).toUpperCase()}`+`${repo.owner.login.toString().slice(1)}`}</td>
                        <td>{repo.open_issues}</td>
                        <td><a href = {repo.svn_url}>Link</a></td>
                        <td>{repo.watchers_count}</td>
                    </tr>
                )
            }))
        }
        else{
            setDispState("None")
        }
    }, [gitData, isLoading])

    return(
        <table className='repo-table-main'>
            <thead>
                <tr>
                    <th>Repo Name</th>
                    <th>Last Updated</th>
                    <th>Repo Owner</th>
                    <th>Open Issues</th>
                    <th>Link</th>
                    <th>Watchers</th>
                </tr>
            </thead>
            <tbody>
                {dispState}
            </tbody>
        </table>
    )
}