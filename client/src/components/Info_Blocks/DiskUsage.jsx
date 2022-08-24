import InfoBlock from "../Assets/InfoBlockContainer"
import { useState, useEffect } from "react";



export default function DiskUsage(){
    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [diskUse, setDiskUse] = useState("")


    const fetchgit = async () => {
        fetch (`http://localhost:5000/user/jaredreyes039`)
            .then(res=>res.json())
            .then(data=>{setGitData(data);console.log(data)})
    }

    useEffect(()=>{
        fetchgit();
        setIsLoading(false)
    }, [])

    useEffect(()=>{
        const err = "N/A"
        if(gitData){
            
            setDiskUse((gitData.disk_usage/1000))
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