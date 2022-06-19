import '../../styles/components/repotracker/repofiledisp.scss'
import { useState, useEffect, useRef, useMemo } from 'react'
import {RadialBar, ResponsiveRadialBar} from '@nivo/radial-bar'

export default function RepoFileDisp(){
    const [gitdata, setGitData] = useState([])
    const [contents, setContents] = useState([])
    async function fetchgit(){
        const data = await fetch('http://localhost:5000/gitdata', {
          method: 'GET',
      }).then(res=> res.json()).then(data => {return(data)})
      let dataArr = []
      data.map((repo)=>{
       dataArr.push(repo.name)
      })
      setGitData(dataArr)
   }
         useEffect(()=>{
            fetchgit()
           }, [])


           async function fetchContents(){
            let contentsArr = []
            gitdata.forEach(async (reponame)=>{
                 const data = await fetch(`https://api.github.com/repos/jaredreyes039/${reponame}/contents`)
                    .then(res=>res.json())
                    .then(data=> {
                        contentsArr.push(data)
                        contentsArr.map((arr, i) =>{
                            arr.sort((a,b)=>{
                                let nameA = a.name.toUpperCase();
                                let nameB = b.name.toUpperCase()
                                if(nameA<nameB){
                                    return -1;
                                }
                                if(nameA>nameB){
                                    return 1;
                                }
                                else{
                                    return 0;
                                }
                            })
                        })

                        let display = contentsArr.map((arr, idx)=>{
                            let color = 'white';
                            return(
                                <ul className = "file-list">
                                    <h3>{gitdata[idx].toUpperCase()}</h3>
                                    {
                                    arr.map((file, idx)=>{
                                       if(file.name.includes( '.md') || file.name.includes('.txt') || file.name.includes('.pdf')){
                                        color = '#e281aa'
                                       }
                                       else if(file.name.includes('.html')){
                                        color = '#aee6d3'
                                       }
                                       else if(file.name.includes('.js' || '.json')){
                                        color = '#f1e587'
                                       }
                                       else if(file.name.includes('.svg') || file.name.includes('.glb')){
                                        color = '#9de2ef'
                                       }
                                       else if(file.name.includes('.css')|| file.name.includes('.scss')){
                                        color = '#c395e0'
                                       }
                                       else{
                                        color = 'white'
                                       }
                                        return (
                                            <>
                                                <li><a style={{backgroundColor: color}} href = {file.download_url}>{file.name.toUpperCase()}</a></li>
                                                <li><span>Type:</span> {file.type}</li>
                                                <li><span>Size:</span> {file.size + 'kb'}</li>
                                            </>
                                        )
                                    })}
                                </ul>
                            )
                        })
                        setDispState(display)
                       } 
                       )
            })
        }
           const [dispState, setDispState] = useState()
           useEffect(()=>{
                fetchContents()
            }, [gitdata])



     return(
        <>
            <div className="repofile-container">
                <h2>Repo File Contents</h2>
                <p>Select a file to download/view its contents</p>
                {dispState}
            </div>
        </>
    )
}