import React from "react";
import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function PrivPubBlock(){
    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dispState, setDispState] = useState("");

    const [pubCount, setPubCount] = useState("");
    const [privCount, setPrivCount] = useState("")

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
        let fetchData = await fetch (`/user/${session}`)
            .then(res=>res.json())
            .then(data=>{return(data)})
        setGitData(fetchData)
        setIsLoading(false)

    }

    useEffect(()=>{
        fetchgit();
    }, [])

    useEffect(()=>{
        if(!isLoading){
            if(gitData.public_repos !== undefined && gitData.owned_private_repos !== undefined){
            setPubCount(gitData.public_repos)
           setPrivCount(gitData.owned_private_repos)
            }}
        else{
            setPubCount("Loading...")
            setPrivCount("Loading...")
        }
    }, [gitData, isLoading])
    return(
        <div className="privpub">
        <InfoBlock
            title = 'Total Repos'
            data = {`${pubCount} / ${privCount}`}
            label = '(Public) / (Private)'
            col
        />
        </div>
    )
}