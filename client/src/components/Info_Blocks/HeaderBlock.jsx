import InfoBlock from "../Assets/InfoBlockContainer";
import { useState, useEffect } from "react";

export default function HeaderBlock(){

    const [gitData, setGitData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bio, setBio] = useState("")
    const [user, setUser] = useState("")
    const [curDate, setCurDate] = useState(new Date().toLocaleString())
    const [profPic, setProfPic] = useState("")

    const fetchgit = async () => {
        fetch (`http://localhost:5000/user/jaredreyes039`)
            .then(res=>res.json())
            .then(data=>{setGitData(data);console.log(data)})
    }

    useEffect(()=>{
        fetchgit();
        setIsLoading(false)
    }, [])

    useEffect(()=>{
        setTimeout(()=>{
            setCurDate(new Date().toLocaleString())
        }, 1000)
    })
    

    useEffect(()=>{
        const err = "Failed to retrieve github profile, please reload the page, or try again later!"
        if(gitData){
            if(gitData.user){
                setUser(gitData.user.toString().charAt(0).toUpperCase() + gitData.user.toString().slice(1))
            }
            else{
                setUser("Loading User...")
            }
            setBio(gitData.bio)
            setProfPic(gitData.user_image)
        }
        else{
            setBio(err)
        }
    }, [isLoading, gitData])

    return(
        <div class = 'headblock'>
        <InfoBlock
        title = {user}
        ProfPic = {profPic}
        alt = "User Portrait"
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
            <h4>&copy; GetYourGitTogether || A Dashboard for getting your Github under control.</h4>
        </div>
        </InfoBlock>
        </div>
    )
}