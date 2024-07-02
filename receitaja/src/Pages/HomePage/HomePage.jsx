import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../Image/textelogo.png'
import './HomePage.css';
import Button from '../../Components/TagsHtml/Buttons/Button';
const HomePage = () => {

    const navigate = useNavigate()

    const sair = ()=>{
        console.log("sair")
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='homePage'>
            <header>
                <h1>Receita-já</h1> 
            </header>
            <nav >
                <Link to='/homepage'>Inicio</Link>
                <Link to='/homepage/perfil'>Perfil</Link>
                <Link to='/homepage/prescrever'>Prescrever</Link>
                <Link to='/homepage/consultaprescricao'>Consultar Prescrição</Link>
                <Button type='button' text='Sair' onclick={sair}/>
            </nav>
            <section className='box' >
                <div className='box-intern'>
                    <Outlet/>
                </div>

            </section>
        </div>
    );
}

export default HomePage;