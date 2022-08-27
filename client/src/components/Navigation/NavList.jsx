import '../../styles/component_styles/nav_styles/nav_list.scss';
import CabinIcon from '@mui/icons-material/Cabin';
import GitHubIcon from '@mui/icons-material/GitHub';



export default function NavList(){
    return(
        <ul className = 'nav-list'>
            <li className='active'><CabinIcon/></li>
        </ul>
    )
}