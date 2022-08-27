import React from "react";
import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function FollowStatusBlock(){
    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dispState, setDispState] = useState("");

    const [followerCount, setFollowerCount] = useState("");
    const [followingCount, setFollowingCount] = useState("");

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
            .then(data=>{setGitData(data);console.log(data)})
    }

    useEffect(()=>{
        fetchgit();
        setIsLoading(false)
    }, [])

    
    useEffect(()=>{
        if(!isLoading){
            if(gitData.followers !== undefined && gitData.following !== undefined){
                    setFollowerCount(gitData.followers)
                    setFollowingCount(gitData.following)
                 }
        }
        else{
                setFollowerCount("Loading...")
                setFollowingCount("Loading...")
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