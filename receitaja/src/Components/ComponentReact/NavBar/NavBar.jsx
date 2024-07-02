import './NavBar.css'
import { Link } from "react-router-dom";

const NavBar = ({rotas}) => {
    return (
        
        <div className="inicial">
            <ul className='lista'>
                {rotas.map((route, index) => (
                    <li key={index} className='item'>
                        <Link to={route.path}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </div>  

        
    );
}

export default NavBar;