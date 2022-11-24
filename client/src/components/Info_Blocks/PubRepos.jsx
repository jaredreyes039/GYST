import InfoBlock from "../lib/InfoBlockContainer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { show_pub_repo_modal } from "../../slices/pubRepoModalDisplay";
import { CookieParser } from "../lib/cookieParser";

export default function PubReposBlock(){

    const [statusColor, setStatusColor] = useState("")
    const [statusMsg, setStatusMsg] = useState("")
    const [dispData, setDispData] = useState("")
    const [display, setDisplay] = useState(<InfoBlock></InfoBlock>)

    const dispatch = useDispatch()

    const {isLoading, data, isSuccess, isError} = useQuery(['gists'], async ()=>{
        let session = CookieParser("USRCDE");
        return await axios
            .get(`/user/${session}`)
    }, {refetchInterval: (data, query) => query.state === 'error' ? 5000 : 10000})


    useEffect(()=>{
        if(isLoading){
            setStatusColor("#2c3e5050")
            setStatusMsg("Loading...")
            setDispData("...")
        }
        if(isSuccess && data.data !== ""){
            if(data.data.public_repos >= 5 && data.data.public_repos < 7){
                setStatusColor("orange")
                setStatusMsg("Your public repos are adding up, have you checked your code  for accidental leaks?")
                setDispData(data.data.public_repos)
            } else if (data.data.public_repos < 3){
                setStatusColor("#7ccc63")
                setStatusMsg("Looking good champ, welcome to the world of programming!")
                setDispData(data.data.public_repos)
            }
            else if (data.data.public_repos > 7){
                setStatusColor("#e74c3c")
                setStatusMsg("Hey, that's quite a lot of public code, maybe do a security check?")
                setDispData(data.data.public_repos)
            }
            else{
                
                setStatusColor("#f39c12")
                setStatusMsg("Remember, everyone can see these!")
                setDispData(data.data.public_repos)

            }
            if(data.data.public_repos === 0){
                setStatusColor("#2c3e5050")
                setStatusMsg("No public repos currently active.")
                setDispData(data.data.public_repos)

            }
        }
        if(isError){
            setStatusColor("#e74c3c")
            setStatusMsg("Failed to load public repo data.")
            setDispData("Error")
        }

    }, [isLoading, isSuccess,data])


    return(
        <div className = 'info-container' onClick={()=>{
            dispatch(show_pub_repo_modal({
                repo_title: "Some Title",
                display: "",
                repo_owner: "Me",
                size: 200,
                description: "gnoigoegnorrg"
            }))
        }}> 
        <InfoBlock 
                    title = "Public Repos"
                    data = {dispData}
                    statusColor = {statusColor}
                    statusMsg = {statusMsg}
        />
        </div>
    )

}
