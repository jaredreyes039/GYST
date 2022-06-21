import '../../../styles/components/nav/navlist.scss'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import UserMenu from '../userMenu';

export default function NavListTop(){
    let nav = useLocation();
    
    return(
        <ul className="navlist">
            <Link  to = '/' className='navlist-item active'><li>Hub</li></Link>
            {/* <Link  to = '/Git' className='navlist-item'><li>Git</li></Link> */}
            <UserMenu />
        </ul>
        
    )
}