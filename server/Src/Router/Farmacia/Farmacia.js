const express = require("express");
const { buscaTodasFarmacias } = require("../../../db/farmacia/farmacia");
const router = express.Router();
 
router.post("/farmacia/registro", async (req,res)=>{
    try {
        const data = req.body;
        console.log(data)
        
       
       
       res.status(201).send(data);

    }catch (error) {
        console.log(error)
    }
});

router.get("/farmacia/lista/",async (req,res)=>{
    try {
        const listaFarmacias = await buscaTodasFarmacias()     
        res.status(200).send(listaFarmacias)
        
    } catch (error) {
        console.log("erro",error);

    }
});


module.exports ={
    router
}