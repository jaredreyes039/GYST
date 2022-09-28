import { useEffect, useMemo, useState } from 'react';
import '../styles/app_styles/login.scss';

export default function Login(){
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(()=>{
        window.addEventListener("resize", ()=>{
            setHeight(window.innerHeight)
        })
    })

    return(
        <div style = {{height: height}} className='login-page'>
            <h1>Disorganized? <span style = {{color: 'red'}}>Git</span>YourSh<span style = {{color: 'red'}}>*</span>tTogether</h1>
            <h1>Overloaded? <span style = {{color: 'red'}}>Git</span>YourSh<span style = {{color: 'red'}}>*</span>tTogether</h1>
            <h1>Lost? <span style = {{color: 'red'}}>Git</span>YourSh<span style = {{color: 'red'}}>*</span>tTogether</h1>
            <h1><span style = {{color: 'red'}}>Git</span>YourSh<span style = {{color: 'red'}}>*</span>tTogether</h1>
            <a className='login-link' href = "http://localhost:5000/auth-req">Log-In</a>
            {/* <p>GetYourGitTogether collects the following data to build your dashboard:
                <hr></hr>
                <ul>
                    <li>User Data (name, bio, avatar, followers/following, public/private repo counts, private gist count, & disk usage)</li>
                    <li>Repo Data (See <a href = "https://docs.github.com/en/rest/repos/repos">https://docs.github.com/en/rest/repos/repos</a> regarding repository data collected from the API)</li>
                    <li>Issue Data (See <a href = "https://docs.github.com/en/rest/issues/issues">https://docs.github.com/en/rest/issues/issues</a> regarding issue data tcollected from the API)</li>
                </ul>
            </p>
            <p className='disclaimer'>{`Github is not involved, nor in anyway responsible for this site, the tools provided, nor the data collected.
            \n Not sponsored by Github \n Use this site at your own risk. GetYourGitTogether V.1.0.0-Beta is not designed for secure public use, and we are not responsible for any damages that may arise from using this app.`}
            </p> */}
        </div>
    )
}
