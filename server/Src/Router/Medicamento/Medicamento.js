const express = require("express");
const { registraMedicamentoEstoque, consultarMedicamentosComEstoque, consultarMedicamentosNome } = require("../../../db/medicamento/medicamento");
const router = express.Router();
 
router.post("/medicamento/registro", async (req,res)=>{
    try {
        const data = await consultarMedicamentosNome(req.body.nome);
        if(data !== null){
            return res.status(200).send('medicamento ja possui cadastro');
        }
        medicamento = await registraMedicamentoEstoque(req.body);       
        return res.status(201).send(medicamento);

    }catch (error) {
        console.log(error)
    }
});

router.get("/medicamento/lista/",async (req,res)=>{
    try {
        const listaMedicamentos = await consultarMedicamentosComEstoque()    
        
        res.status(200).send(listaMedicamentos)
        
    } catch (error) {
        console.log("erro",error);

    }
});


module.exports ={
    router
}