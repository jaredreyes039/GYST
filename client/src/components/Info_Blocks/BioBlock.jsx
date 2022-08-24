import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function BioBlock(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bio, setBio] = useState("")

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
        const err = "Failed to retrieve github bio, please reload the page, or try again later!"
        if(gitData){
            setBio(gitData.bio)
        }
        else{
            setBio(err)
        }
    }, [isLoading, gitData])

    return(
        <div class = 'bioblock'>
        <InfoBlock
        title = "Bio"
        data = {bio}
        />
        </div>
    )
}