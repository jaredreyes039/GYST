import '../../styles/component_styles/asset_styles/info_block.scss';

export default function InfoBlock(props){
    return(
        <div className='info-block'>
            <h1>{props.title}</h1>
            <img src = {props.ProfPic} alt = {props.alt}/>
            <h2>{props.data}</h2>
            <h3>{props.label}</h3>
            {props.children}
        </div>
    )
}