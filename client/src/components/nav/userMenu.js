import { useState, useEffect } from 'react'
import '../../styles/components/nav/usermenu.scss'

// DEPRECATED

export default function UserMenu(){
    const [gitdata, setGitData] = useState()
    async function fetchgit(){
        const data = await fetch('/gitdata', {
          method: 'GET',
      }).then(res=> res.json()).then(data => {return(data)})
      setGitData(data)
   }

         useEffect(()=>{
            fetchgit()
           }, [])
           
      let backgroundUrl = ''
    if(gitdata){
        backgroundUrl = gitdata.avatar_url
    }
    else{
        backgroundUrl = 'https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-vector-id1209654046?k=20&m=1209654046&s=612x612&w=0&h=Atw7VdjWG8KgyST8AXXJdmBkzn0lvgqyWod9vTb2XoE='
    }
    return(
        <>
            <div style={{backgroundImage: `url(${backgroundUrl})`}} className="usermenu-container">
            </div>
        </>
    )
}