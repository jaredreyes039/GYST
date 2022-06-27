import { useEffect, useState } from 'react'
import '../../styles/components/datacontainer/datacontainer.scss'

export default function UserContainer(){
    const [netData, setNetData] = useState()
    const [accountData, setAccountData] = useState()

    const [gitdata, setGitData] = useState([])

    async function fetchgit(){
        const data = await fetch('/gitdatauser', {
          method: 'GET',
      }).then(res=> res.json()).then(data => {return(data)}).catch((err)=>console.log(err))
      setGitData(data)
   }

    useEffect(()=>{
       fetchgit()
      }, [])

      const fetchNetlifyUser =async  () => {
        const data = await fetch('/siteuserdata', {
            method: 'GET',
        }).then(res=>res.json()).then(data=> {return data}).catch((err)=>console.log(err))
            setNetData(data)
            }

      useEffect(()=>{
        fetchNetlifyUser()
    }, [])

    const fetchNetlifyAccount =async  () => {
        const data = await fetch('/siteaccountdata', {
            method: 'GET',
        }).then(res=>res.json()).then(data=> {return data}).catch((err)=>console.log(err))
            setAccountData(data)
            }

    useEffect(()=>{
        fetchNetlifyAccount()
    }, [])



    let colors = [
        '#aee6d3',
        '#f1e587',
        '#9de2ef',
        '#c395e0'
    ]

    let netDisp = ''

    const getNetDisp = () => {
    if(netData && accountData){
        netDisp = <>
            <ul className = 'user-list'>
                <li><img src = {netData[0].avatar_url}></img></li>
                <li><span style = {{backgroundColor: colors[0], padding: '0.1%'}}>Name: </span>{accountData[0].name}</li>
                <li><span style = {{backgroundColor: colors[0], padding: '0.1%'}}>Role: </span>{accountData[0].roles_allowed[0]}</li>
                <li><span style = {{backgroundColor: colors[0], padding: '0.1%'}}>Email: </span>{netData[0].email}</li>
                <li><span style = {{backgroundColor: colors[2], padding: '0.1%'}}>Sites: </span>{netData[0].site_count}</li>
                <li><span style = {{backgroundColor: colors[1], padding: '0.1%'}}>Last Log In: </span>{netData[0].last_login}</li>
                <li><span style = {{backgroundColor: colors[1], padding: '0.1%'}}>Notifications Checked At: </span>{netData[0].onboarding_progress.notifications_read_at}</li>
                <li><span style = {{backgroundColor: colors[1], padding: '0.1%'}}>Next Billing Period: </span>{accountData[0].next_billing_period_start}</li>
            </ul>
        </>
    } else{
        netDisp =<h5 className='error-msg'>ERROR: Could not load Netlify user data.
        Perhaps the personal token has expired? Access
        <a href = 'https://www.netlify.com/'> Netlify Dev Settings</a> for more information.
    </h5>
    }
    return netDisp;
}
let gitDisp = ''
const getGitDisp = () => {
if(gitdata != undefined){
    gitDisp = <>
        <ul className = 'git-list'>
            <li><img src = {gitdata.avatar_url}></img></li>
            <li><span style = {{backgroundColor: colors[0], padding: '0.1%'}}>Name: </span>{gitdata.login}</li>
            <li><span style = {{backgroundColor: colors[0], padding: '0.1%'}}>Bio: </span>{gitdata.bio}</li>
            <li><span style = {{backgroundColor: colors[2], padding: '0.1%'}}>Disk Usage: </span>{gitdata.disk_usage}</li>
            <li><span style = {{backgroundColor: colors[2], padding: '0.1%'}}>Followers: </span>{gitdata.followers}</li>
            <li><span style = {{backgroundColor: colors[2], padding: '0.1%'}}>Public Gists: </span>{gitdata.public_gists}</li>
            <li><span style = {{backgroundColor: colors[2], padding: '0.1%'}}>Private Gists: </span>{gitdata.private_gists}</li>
            <li><span style = {{backgroundColor: colors[2], padding: '0.1%'}}>Public Repos: </span>{gitdata.public_repos}</li>
            <li><span style = {{backgroundColor: colors[1], padding: '0.1%'}}>Last Updated: </span>{gitdata.updated_at}</li> 
        </ul>
    </>
} else{
    gitDisp = <h5 className='error-msg'>ERROR: Could not load Github user data.
    Perhaps the personal token has expired? Access
    <a href = 'https://www.github.com/'> Github Dev Settings</a> for more information.
</h5>
}
return gitDisp;
}

    return(
        <>
            <div className="data-container">
                <div className = 'scroll-container'>
                {getGitDisp()}
                 {getNetDisp()}
                 
                </div>
            </div> 
        </>
    )
}