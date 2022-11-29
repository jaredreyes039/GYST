import React from "react";
import InfoBlock from "../lib/InfoBlockContainer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { show_issue_list_modal } from "../../slices/issueListModalDisplay";
import { CookieParser } from "../lib/cookieParser";

export default function AssignedIssuesBlock(){

    const dispatch = useDispatch()

    const {isLoading, data, isSuccess, isError} = useQuery(['assigned_issues'], async ()=>{
        let session =  CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    }, {refetchInterval: (data, query) => query.state === 'error' ? 5000 : 10000})


    const [statusMsg, setStatusMsg] = useState();
    const [statusColor, setStatusColor] = useState("")

    useEffect(()=>{

        if(isLoading){
            setStatusMsg("Loading...")
        }

        if(isSuccess){
            if(data.data.issue_data && data.data.issue_data.length !== undefined){
                let {issue_data} = data.data
                let issues = issue_data.length
                if(issues >= 5 && issues < 7){
                    setStatusMsg("Your issues are adding up, soon not even therapy will solve this!")
                }
                else if (issues >= 7 ){
                    setStatusMsg("Uh-Oh")
                }
                else if (issues < 3){
                    setStatusMsg("Not looking too bad right now!")
                }
                else{
                    setStatusMsg("There's a few issues present. Maybe give them some attention, today?")
                }
            }}
        if(isError){
            setStatusMsg("Failed to load assigned issues count.")
        }
    }, [isLoading, isSuccess, data, isError])


    if(isLoading){
        return(
            <div className="info-container">
            <InfoBlock
                title = 'Assigned Issues'
                data = {'...'}
                label = {statusMsg}
                statusColor = {statusColor}
                statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if (isSuccess){
        return(
            <div className="info-container" onClick = {()=>{
                dispatch(show_issue_list_modal())
            }}>
            <InfoBlock
                title = 'Assigned Issues'
                data = {data.data.issue_data ? data.data.issue_data.length : 0}
                label = {statusMsg}
                statusColor = {statusColor}
                statusMsg = {statusMsg}
            />
            </div>
        )
    }
    if(isError){
        return(
            <div className="info-container">
            <InfoBlock
                title = 'Assigned Issues'
                data = {"Error"}
                label = {statusMsg}
                statusColor = {statusColor}
                statusMsg = {statusMsg}
            />
            </div>
        )
    }
}
