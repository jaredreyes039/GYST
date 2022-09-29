import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function HeaderBlock(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bio, setBio] = useState("")
    const [user, setUser] = useState("")
    const [curDate, setCurDate] = useState(new Date().toLocaleString())
    const [profPic, setProfPic] = useState("Loading...")


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
        const fetchdata = await fetch (`/user/${session}`)
            .then(res=>res.json())
            .then(data=> {return(data)})
        setGitData(fetchdata)
        setIsLoading(false)

    }

    useEffect(()=>{
        fetchgit();
    }, [])

    useEffect(()=>{
        setTimeout(()=>{
            setCurDate(new Date().toLocaleString())
        }, 1000)
    })
    

    useEffect(()=>{
        const err = "Failed to retrieve github profile, please reload the page, or try again later!"
        if(!isLoading){
            if(gitData.user){
                setUser(gitData.user.toString().charAt(0).toUpperCase() + gitData.user.toString().slice(1))
            }
            if(gitData.user_image){
                setTimeout(()=>{setProfPic(<img src = {gitData.user_image} alt = "user portrait" />)}, 1000)
            }
            if(gitData.bio){
                setBio(gitData.bio)
            }
            else{
                setProfPic("Loading Avatar...")
                setUser("Loading User...")
                setBio("Loading User Bio...")
            }
        }
        else{
            setBio(err)
            setProfPic(err)
            setUser(err)
        }
    }, [isLoading, gitData])

    return(
        <div class = 'headblock'>
        <InfoBlock
        title = {user}
        img = {profPic}
        data = {bio}
        label = {curDate}
        >
        <div
            style = {{
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                margin: '2.5%',
                padding: '2.5%',
                fontSize: '0.85em',
                borderRadius: '15px'
            }}
        >
            <h4>&copy; GitYourSh*tTogether || A Dashboard for getting your Github under control.</h4>
        </div>
        </InfoBlock>
        </div>
    )
}