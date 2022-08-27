import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function GistBlock(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [gists, setGists] = useState("")

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
        const err = "N/A"
        if(!isLoading){
            if(gitData.private_gists !== undefined){
            setGists(gitData.private_gists===0?"None":gitData.private_gists)
            }
            else(setGists("Loading Gists..."))
        }
        else{
            setGists(err)
        }
    }, [isLoading, gitData])

    return(
        <div class = 'gist'>
        <InfoBlock
        title = "Total Gists"
        data = {gists}
        label = " (Private) "
        />
        </div>
    )
}