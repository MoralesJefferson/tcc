import './NavBar.css'
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        
        <div className='inicial'>
            <ul className='lista'>
                <li className='item'><Link to='/'>Home</Link></li>
                <li className='item'><Link to='/sobre'>Sobre</Link></li>
                <li className='item'><Link to='/vantagens'>Vantagens</Link></li>
                <li className='item'><Link to='/contato'>Contato</Link></li>
            </ul>
        </div>    

        
    );
}

export default NavBar;