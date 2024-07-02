const express = require("express");
const { verificaToken } = require("../../middleware/verificaToken");
const router = express.Router(); 

router.post("/homepage/prescrever", verificaToken,async (req,res)=>{
    try {

        const data = req.body;
        console.log(data)
        console.log(req.usuario)

        res.status(201).send(data);

    }catch (error) {
        res.status(500).json({
            "message": error
        });
    }
    
});


module.exports ={
    router
}