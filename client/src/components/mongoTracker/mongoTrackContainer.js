import '../../styles/components/mongotracker/mongotrackcontainer.scss'
import { useState } from 'react'
import { useEffect } from 'react'

export default function MongoTrackerContainer(){

    const [stackdata, setStackData] = useState({items: []})
    async function fetchStack(){
        const data = await fetch('https://api.stackexchange.com/2.3/questions?site=stackoverflow&tagged=reactjs&pagesize=5', {
          method: 'GET',
      }).then(res=> res.json()).then(data => {return(data)})
      setStackData(data)
   }

    useEffect(()=>{
       fetchStack()
      }, [])

      const stackDisp = () => {
        if(stackdata.items.length > 0){
            return(
                <>
                        {stackdata.items.map((question)=>{
                            return(
                                <>
                                <div className="questions-container">
                                    <h5><a href = {question.link}>{question.title}</a></h5>
                                    <ul className='question-info'>
                                        <li><span>Answers: </span>{question.answer_count}</li>
                                        <ul className='tags'>
                                            {question.tags.map((tag)=>{
                                                return(
                                                    <>
                                                        <li>{tag}</li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                        <li><span>Owner: </span>{question.owner.display_name}</li>
                                    </ul>
                                    </div>
                                </>
                            )
                        })}
                </>
            )
        }
        else{
            return(
                <>
                    <h4 className = 'error-msg'>ERROR: Failed to load StackExchange Module, perhaps
                    the request limit has been reached? Read the
                    <a href = 'https://api.stackexchange.com/docs'> StackExchange API docs</a> for more information.
                </h4>
                </>
            )
        }
      }
    return(
        <>
            <div className="mongotrack-container">
                {stackDisp()}
            </div>
        </>
    )
}