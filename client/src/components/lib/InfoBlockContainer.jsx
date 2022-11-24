import { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/app_styles/global.scss'

export default function InfoBlock(props){
    
    const [statusColor, setStatusColor] = useState(props.statusColor)
    const [statusMsg, setStatusMsg] = useState(props.statusMsg)
    const [data, setData] = useState(props.data)

    useEffect(()=>{
        setStatusColor(props.statusColor)
        setStatusMsg(props.statusMsg)
        setData(props.data)
    }, [props.data, props.statusColor, props.statusMsg])
    
    return(
        <div className='info-block' title={props.title}>
            <h1>{props.title}</h1>
            <div style = {{backgroundColor: statusColor}} className='info-status'>
                <h2>{data}</h2>
            </div>
            {props.children}
        </div>
    )
}
