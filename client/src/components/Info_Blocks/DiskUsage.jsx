import InfoBlock from "../Assets/InfoBlockContainer"
import { useState, useEffect } from "react";



export default function DiskUsage(){
    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [diskUse, setDiskUse] = useState("")

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
        let fetchData = await fetch (`http://localhost:5000/user/${session}`)
            .then(res=>res.json())
            .then(data=>{return(data)})
        setGitData(fetchData)
        setIsLoading(false)
    }

    useEffect(()=>{
        fetchgit();
    }, [])

    useEffect(()=>{
        const err = "N/A"
        if(!isLoading){
            if(gitData.disk_usage !== undefined){
            setDiskUse((gitData.disk_usage/1000))
            }
            else{
                setDiskUse("Loading Disk Usage...")
            }
        }
        else{
            setDiskUse(err)
        }
    }, [isLoading, gitData])
    return(
        <div className="disk">
            <InfoBlock
                title = "Disk Usage"
                data = {diskUse}
                label = "kilobytes (kB)"
                />
        </div>
    )
}