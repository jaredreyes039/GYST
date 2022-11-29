import InfoBlock from "../lib/InfoBlockContainer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CookieParser } from "../lib/cookieParser";

export default function ProjectsBlock(){

    const [statusColor, setStatusColor] = useState("")
    const [statusMsg, setStatusMsg] = useState("")

    const {isLoading, data, isSuccess, isError} = useQuery(['gists'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    }, {refetchInterval: (data, query) => query.state === 'error' ? 5000 : 10000})
    

    useEffect(()=>{
        const bounds = [3, 5, 7, 9]

        if(isLoading){
            setStatusMsg("Loading...")
        }
        if(isSuccess){
            if(data.data.project_data !== undefined){
            if(data.data.project_data.length >= 5 && data.data.project_data.length < 7){
                setStatusMsg("The projects are racking up, have you checked on any of them lately?")
            } else if (data.data.project_data.length < 3){
                setStatusMsg("Looks like you might be busy for a little while!")
            }
            else if (data.data.project_data.length > 7){
                setStatusMsg("Oh sh*t, you're going to be busy for a long time... you got this!")
            }
            else{
                setStatusMsg("Your project stack is growing, maybe knock out a few tasks, today?")
            }
            if(data.data.project_data.length === 0){
                setStatusMsg("No projects currently active.")
            }
        }
        }
        if (isError) {
            setStatusMsg("Failed to load projects count.")
        }

    }, [isLoading, isSuccess, data])

    if (isLoading){
        return(
            <div className="proj info-container">
            <InfoBlock
            title = "Active Projects"
            data = {"..."}
            statusColor = {""}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isSuccess){
        return(
            <div className="proj info-container">
            <InfoBlock
            title = "Active Projects"
            data = {data.data.project_data ? data.data.project_data.length : 0}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isError) {
        return(
            <div className="proj info-container">
            <InfoBlock
            title = "Active Projects"
            data = {"Error"}
            statusColor = {statusColor}
            statusMsg = {statusMsg}
            />
            </div>
        )
    }
}
