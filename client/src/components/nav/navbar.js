import '../../styles/components/nav/navbar.scss'

export default function NavBar(props){

    return(
        <>
            <div className="navbar-container"
                style = {{
                    width: props.width,
                    height: props.height
                }}
            >
                {props.children}
            </div>
        </>
    )
}