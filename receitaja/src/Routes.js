import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from "./Pages/Login/Login";
import Cadastro from "./Pages/Cadastro/Cadastro";
import EsqueciSenha from "./Pages/EsqueciSenha/EsqueciSenha";
import Sobre from "./Pages/Sobre/Sobre";
import Vantagens from "./Pages/Vantagens/Vantagens";
import Contato from "./Pages/Contato/Contato";


const MinhasRotas = () => {
    return (
        <Routes>
           <Route path="/" element={<Home/>}>
                <Route path="" element={<Login/>}/>
                <Route path="cadastro" element={<Cadastro/>}/>
                <Route path="esquecisenha" element={<EsqueciSenha/>}/>
                <Route path="sobre" element={<Sobre/>}/>
                <Route path="vantagens" element={<Vantagens/>}/>
                <Route path="contato" element={<Contato/>}/>
            </Route>
           
        </Routes>
    );
}

export default MinhasRotas;