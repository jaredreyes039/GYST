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
            <h1>GetYourGitTogether</h1>
            <h3>Let's make sense of your Github together, today!</h3>
            <p>Made by an ADHD dev, for an ADHD dev</p>
            <a className='login-link' href = "http://localhost:5000/auth-req">Log-In</a>
            <p>GetYourGitTogether collects the following data to build your dashboard:
                <hr></hr>
                <ul>
                    <li>User Data (name, bio, avatar, followers/following, public/private repo counts, private gist count, & disk usage)</li>
                    <li>Repo Data (See <a href = "https://docs.github.com/en/rest/repos/repos">https://docs.github.com/en/rest/repos/repos</a> regarding repository data collected from the API)</li>
                    <li>Issue Data (See <a href = "https://docs.github.com/en/rest/issues/issues">https://docs.github.com/en/rest/issues/issues</a> regarding issue data tcollected from the API)</li>
                    <li>For a more thorough, clear, and concise report, please visit our <a href = '#'>Terms of Service Agreement</a></li>
                </ul>
            </p>
            <p className='disclaimer'>{`Github is not involved, nor in anyway responsible for this site, the tools provided, nor the data collected.
            \n Not sponsored by Github`}
            </p>
        </div>
    )
}
