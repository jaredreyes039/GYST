import { ProgressBar } from "react-bootstrap"
import '../../styles/components/repotracker/repolang.scss'
import { useState, useEffect } from "react"

export default function RepoLang(){
    const [dispState, setDispState] = useState()

    const [gitdata, setGitData] = useState([])
    const [contents, setContents] = useState([])

        async function getGitData(){
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
            getGitData()
           }, [])
          
           function progBars(){
            let contentsArr = []
            gitdata.forEach( async (reponame)=>{
                 await fetch(`https://api.github.com/repos/jaredreyes039/${reponame}/languages`)
                    .then(res=>res.json())
                    .then(data=> {
                        contentsArr.push(data)

                        console.log(contentsArr)
                        let display = contentsArr.map((arr, idx)=>{
                            let colors = ['green', 'red', 'yellow', 'purple', 'teal']
                            let sumArr = []

                            return(
                             <>
                                <ul className = "lang-list">
                                    <h3>{gitdata[idx].toUpperCase()}</h3>
                                    {
                                     Object.keys(arr).map((key, i)=>{
                                         sumArr.push(arr[key])
                                         const getSum = sumArr.reduce((prev, curr)=>{
                                             const sum = prev + curr
                                             return sum
                                         }, sumArr[0])

                                         return(
                                             <>
                                             <label for = 'prog'>{key}</label>
                                             <ProgressBar label = {arr[key]}  name = 'prog' style={{borderRadius: '16px' ,width: '100%', marginBottom: '2.5%'}} variant= {colors[i]} animated now={(arr[key])} max = {getSum} />
                                             </>
                                         )
                                     })
                                    }
                                </ul>
                                </>
                            )
                        })
                        setDispState(display)
                       } 
                       )
            })
        }

           useEffect(()=>{
           progBars()
       }, [gitdata])


    return(
        <>
            <div className="repolang-container">
            <h2>Language Composition</h2>
            <p>A breakdown of each repo's language composition</p>
             {dispState}
            </div>
        </>
    )
}