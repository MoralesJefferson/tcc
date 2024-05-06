import {Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import PrescricaoMedica from "./page/PrescricaoMedica/PrescricaoMedica";
import PrescricaoFarmacia from "./page/PrescricaoFarmacia/PrescricaoFarmacia";
import Cadastro from "./page/Cadastro/Cadastro";

function MinhasRotas(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/prescricaoMedica" element={<PrescricaoMedica/>} />
            <Route path="/prescricaoFarmacia" element={<PrescricaoFarmacia/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
        </Routes>
    )
}
export default MinhasRotas;