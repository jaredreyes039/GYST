import InfoBlock from "../lib/InfoBlockContainer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { show_priv_repo_modal } from "../../slices/privRepoModalDisplay";
import { CookieParser } from "../lib/cookieParser";

export default function PrivReposBlock(){

    const dispatch = useDispatch()

    const {isLoading, data, isSuccess, isError} = useQuery(['gists'], ()=>{
        let session = CookieParser("USRCDE");
        return axios
            .get(`/user/${session}`)
    }, {refetchInterval: (data, query) => query.state === 'error' ? 5000 : 10000})

    if (isLoading){
        return(
            <div className = 'info-container'>
            <InfoBlock
            title = "Private Repos"
            data = {"..."}
            statusColor = ""
            statusMsg = "Loading..."
            />
            </div>
        )
    }
    if (isSuccess){
        return(
            <div className = 'info-container' onClick = {()=>{
                dispatch(show_priv_repo_modal())
            }}>
            <InfoBlock
            title = "Private Repos"
            data = {data.data.owned_private_repos}
            statusColor = ""
            statusMsg = "Secured and visible to your eyes only!"
            />
            </div>
        )
    }
    if (isError) {
        return(
            <div className = 'info-container'>
            <InfoBlock
            title = "Private Repos"
            data = {"Error"}
            statusColor = ""
            statusMsg = "Failed to load private repos count."
            />
            </div>
        )
    }
}
