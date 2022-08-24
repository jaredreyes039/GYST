import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function GistBlock(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [gists, setGists] = useState("")

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
            
            setGists(gitData.private_gists===0?"None":gitData.private_gists)
        }
        else{
            setGists(err)
        }
    }, [isLoading, gitData])

    return(
        <div class = 'gist'>
        <InfoBlock
        title = "Total Gists"
        data = {gists}
        label = " (Private) "
        />
        </div>
    )
}