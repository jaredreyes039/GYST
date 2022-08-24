import React from "react";
import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function FollowStatusBlock(){
    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dispState, setDispState] = useState("");

    const [followerCount, setFollowerCount] = useState("");
    const [followingCount, setFollowingCount] = useState("");


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
        if(isLoading){
            setDispState(<tr><td>"Loading..."</td></tr>)
        }
        else{
           setFollowerCount(gitData.followers)
           setFollowingCount(gitData.following)
        }
    }, [gitData, isLoading])
    return(
        <div className="social">
        <InfoBlock
            title = 'Social Status'
            data = {`${followerCount} / ${followingCount}`}
            label = '(Followers) / (Following)'
        />
        </div>
    )
}