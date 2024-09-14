const express = require("express");
const router = express.Router();
const z = require('zod');
const { validaDadosRegistroPaciente } = require("../../Servicos/Pacientes/TrataDadosPacientes");
const { registraPaciente, buscaTodosPacientes } = require("../../../db/usuario/paciente/Paciente");

module.exports = (io) => {
    // Definição do esquema de validação com zod
    const pacienteEsquema = z.object({
        nome: z.string().trim().min(3),
        cpf: z.string().optional(),
        data_nascimento: z.coerce.date().refine((data) => data < new Date(), {
            message: "data de nascimento não pode ser superior a data atual!!!"
        }).optional(),
        cartao_sus: z.string().optional(),
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
    });


    router.post("/paciente/registro", async (req, res) => {
        try {
            const message = req.body; // Corrigido para acessar req.body.message corretamente
            console.log(message);
            io.emit('message', message); // Emitir evento para todos os clientes conectados
            res.status(200).send('Message sent');
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