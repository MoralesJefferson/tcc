const express = require("express");
const router = express.Router();
const z = require('zod');
const { validaDadosRegistroPaciente } = require("../../Servicos/Pacientes/TrataDadosPacientes");
const { registraPaciente, buscaTodosPacientes, buscaPacienteId, removerPaciente, editaPaciente } = require("../../../db/usuario/paciente/Paciente");

module.exports = (io) => {
    
    const pacienteEsquema = z.object({
        nome: z.string().trim().min(3),
        cpf: z.string().optional(),
        data_nascimento: z.coerce.date().refine((data) => data < new Date(), {
            message: "data de nascimento não pode ser superior a data atual!!!"
        }).optional(),
        cartao_sus: z.string().optional(),
    });

    router.post("/paciente/registro", async (req, res) => {
        try {

            const paciente = req.body; 
            const newPaciente = await registraPaciente(paciente) 
            res.status(200).send(newPaciente);

        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log(error.errors[0].message);
                res.status(422).json(error.errors[0].message);
                return;
            } else {
                console.log(error);
                res.status(500).json({
                    "message": error
                });
            }
        }
    });

    router.put("/paciente/editar/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const paciente = await buscaPacienteId(id)
            
            if(paciente.length === 0){
                console.log('paciente não existe não tem cadastro!!!');
                return res.status(422).json({message:'paciente não encontrado na base de dados!!!'})
            }

            const dadosNewPaciente = pacienteEsquema.parse(req.body);
            await editaPaciente(id,dadosNewPaciente) 

            res.status(200).send("Dados Alterados com Sucesso!!!");
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log("teste",error);
                res.status(422).json(error.errors[0].message);
                return;
            } else {
                console.log("aqui",error);
                res.status(500).json({
                    "message": error
                });
            }
        }
    });

    router.delete("/paciente/remover/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            
            const paciente = await buscaPacienteId(id)
            
            if(paciente.length === 0){
                console.log('paciente não existe não tem cadastro!!!');
                return res.status(422).json({message:'paciente não encontrado na base de dados!!!'})
            }
            
            const response = await removerPaciente(id) 

            res.status(200).send(response);
        } catch (error) {
                console.log(error);
                res.status(409).json({
                    "message": "Não é possível excluir o paciente porque ele está associado a uma ou mais prescrições médicas. Por favor, remova essas prescrições antes de tentar novamente."
                });
            
        }
    });

    router.get("/paciente/lista/", async (req, res) => {
        try {
            const listaPaciente = await buscaTodosPacientes();
            res.status(200).send(listaPaciente);
        } catch (error) {
            console.log("erro", error);
        }
    });

    return router;
};