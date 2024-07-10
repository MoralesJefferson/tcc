import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from "./Layout/Login/Login";
import Cadastro from "./Layout/Cadastro/Cadastro";
import EsqueciSenha from "./Layout/EsqueciSenha/EsqueciSenha";
import Sobre from "./Layout/Sobre/Sobre";
import Vantagens from "./Layout/Vantagens/Vantagens";
import Contato from "./Layout/Contato/Contato";
import HomePage from "./Pages/HomePage/HomePage";
import Perfil from "./Layout/Perfil/Perfil";
import Prescrever from "./Layout/Prescrever/Prescrever";
import Medicamentos from "./Layout/Medicamentos/Medicamentos";
import PrivateRoutess from "./Private/PrivateRoutess";
import Prescricoes from "./Layout/Prescricoes/Prescricoes";




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
            
            
            <Route path="/homepage" element={<PrivateRoutess><HomePage/></PrivateRoutess>}>
                    <Route path="perfil" element={<PrivateRoutess><Perfil /></PrivateRoutess>} />
                    <Route path="prescricoes" element={<PrivateRoutess><Prescricoes/></PrivateRoutess>}/>
                    <Route path="prescrever" element={<PrivateRoutess><Prescrever /></PrivateRoutess>}/>
                    <Route path="medicamentos" element={<PrivateRoutess><Medicamentos/></PrivateRoutess>} />
            </Route>
            
           
        </Routes>
    );
}

export default MinhasRotas;