import InfoBlock from "../lib/InfoBlockContainer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CookieParser } from "../lib/cookieParser";

export default function GistsBlock(){

    const [statusColor, setStatusColor] = useState("")
    const [statusMsg, setStatusMsg] = useState("");

    const {isLoading, data, isSuccess, isError} = useQuery(['gists'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    }, {refetchInterval: (data, query) => query.state === 'error' ? 5000 : 10000})

    useEffect(()=>{
        if(isLoading){
            setStatusMsg("Loading...")
        }
        if(isSuccess){
            if(data.data.private_gists === 0){
                setStatusMsg("No gists currently acitve.")
            }
            else {
                setStatusMsg("You know what? These things are amazing for code snippets!")
            }
        }
        if(isError){
            setStatusMsg('Failed to load gists count.')
        }
    }, [isLoading, isSuccess, data, isError])

    if(isLoading){
        return(
            <div className = 'gist info-container'>
            <InfoBlock
            title = "Private Gists"
            data = {"..."}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isSuccess){
        return(
            <div className = 'gist info-container'>
            <InfoBlock
            title = "Private Gists"
            data = {data.data.private_gists}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isError) {
        return(
            <div className = 'gist info-container'>
            <InfoBlock
            title = "Private Gists"
            data = {"Error"}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
}
