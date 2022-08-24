import React from "react";
import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function PrivPubBlock(){
    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dispState, setDispState] = useState("");

    const [pubCount, setPubCount] = useState("");
    const [privCount, setPrivCount] = useState("")

    const fetchgit = async () => {
        fetch (`http://localhost:5000/user/jaredreyes039`)
            .then(res=>res.json())
            .then(data=>setGitData(data))
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
           setPubCount(gitData.public_repos)
           setPrivCount(gitData.owned_private_repos)
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