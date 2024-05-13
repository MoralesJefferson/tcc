import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from "./Pages/Login/Login";
import Cadastro from "./Pages/Cadastro/Cadastro";
import EsqueciSenha from "./Pages/EsqueciSenha/EsqueciSenha";


const MinhasRotas = () => {
    return (
        <Routes>
           <Route path="/" element={<Home/>}>
                <Route path="" element={<Login/>}/>
                <Route path="cadastro" element={<Cadastro/>}/>
                <Route path="esquecisenha" element={<EsqueciSenha/>}/>
            </Route>
           
        </Routes>
    );
}

export default MinhasRotas;