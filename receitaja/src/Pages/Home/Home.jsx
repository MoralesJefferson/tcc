
import NavBar from '../../Components/ComponentReact/NavBar/NavBar'
import './Home.css';
import logo from '../../Image/textelogo.png'
import { Outlet } from 'react-router-dom';
function Home() {
  const rotas = [
    { path: '/', name: 'Home' },
    { path: '/sobre', name: 'Sobre' },
    { path: '/vantagens', name: 'Vantagens' },
    { path: '/contato', name: 'Contato' }
]
  return (
    <div className="home">
    <NavBar rotas={rotas} />
      <div className='esquerda'>
          <img src={logo} alt='Logo Do Site' title='Logo Do Site'/>
      </div>
      <div className='direita'>
        <Outlet/>
      </div>
      
    </div>
  );
}

export default Home;
