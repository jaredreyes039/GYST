import InfoBlock from "../lib/InfoBlockContainer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CookieParser } from "../lib/cookieParser";

export default function SocialMetrics(){
    
    const [statusColor, setStatusColor] = useState("")
    const [statusMsg, setStatusMsg] = useState("")

    const {isLoading, data, isSuccess, isError} = useQuery(['gists'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    }, {refetchInterval: (data, query) => query.state === 'error' ? 5000 : 10000})

    useEffect(()=>{
        if(isLoading){
            setStatusColor("#2c3e5050")
            setStatusMsg("Loading...")
        }
        if(isSuccess){
            if(data.data){
                setStatusColor("#7ccc63")
                setStatusMsg(`Followers : Following`)
            }
            else {
                setStatusColor("#e74c3c")
                setStatusMsg("Failed to load social metrics.")
            }
        }
        if(isError){
            setStatusColor("#e74c3c")
            setStatusMsg("Failed to load social metrics.")
        }
    }, [isLoading, isSuccess, data])

    if(isLoading){
        return(
            <div className = 'social info-container'>
            <InfoBlock
            title = "Social Metrics"
            data = {"..."}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isSuccess){
        return(
            <div className = 'social info-container'>
            <InfoBlock
            title = "Social Metrics"
            data = {`${data.data.followers} : ${data.data.following}`}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isError) {
        return(
            <div className = 'social info-container'>
            <InfoBlock
            title = "Social Metrics"
            data = {"Error"}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
}
