const express = require("express");
const router = express.Router();
const z = require ('zod'); 
const { validaDadosRegistroPaciente } = require("../../Servicos/Pacientes/TrataDadosPacientes");
const { registraPaciente, buscaTodosPacientes } = require("../../../db/usuario/paciente/Paciente");

const pacienteEsquema = z.object({
    nome: z.string().trim().min(3),
    cpf: z.string().optional(),
    data_nascimento: z.coerce.date().refine((data)=> data < new Date(),{
        message:"data de nascimento não pode ser superior a data atual!!!"
    }).optional(),
    cartao_sus:z.string().optional(),
})

router.post("/paciente/registro", async (req,res)=>{
    try {
        const data = pacienteEsquema.parse(req.body);
        console.log(data)
        
        const paciente = await validaDadosRegistroPaciente(data);
       
       if (paciente.error){
            console.log(paciente.error)
            return res.status(400).json(paciente.error);
        }
        const novoPaciente = await registraPaciente(paciente)
       
       res.status(201).send(novoPaciente);

    }catch (error) {
        
        if (error instanceof z.ZodError) {
            console.log(error.errors[0].message)
            res.status(422).json(error.errors[0].message)
            return   
        }else{
            console.log(error)
            res.status(500).json({
                "message": error
            });
        }
    }
});

router.get("/paciente/lista/",async (req,res)=>{
    try {
        const listaPaciente = await buscaTodosPacientes()    
        res.status(200).send(listaPaciente)
        
    } catch (error) {
        console.log("erro",error);

    }
});


module.exports ={
    router
}