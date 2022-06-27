import '../../../styles/components/nav/navlist.scss'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import NetworkWifi2BarIcon from '@mui/icons-material/NetworkWifi2Bar';
import BackupTableIcon from '@mui/icons-material/BackupTable';

export default function NavListTop(){
    let nav = useLocation();
    
    const handleClick = (e) => {
        e.preventDefault();
        alert(`ERROR: I apologize, but this section is not available yet. Know, our tech elves are on the mission and will be releasing updates soon! For more information see https://github.com/jaredreyes039/DevDash`)
    }

    return(
        <ul className="navlist">
            <Link  to = '/' className='navlist-item active'><li><HomeIcon/></li></Link>
            <Link  to = '/' className='navlist-item'><li onClick={handleClick}><GitHubIcon/></li></Link>
            <Link  to = '/' className='navlist-item'><li onClick={handleClick}><NetworkWifi2BarIcon/></li></Link>
            <Link  to = '/' className='navlist-item'><li onClick={handleClick}><BackupTableIcon/></li></Link>
            <Link  to = '/' className='navlist-item'><li onClick={handleClick}><SettingsIcon /></li></Link>
        </ul>
    )
}