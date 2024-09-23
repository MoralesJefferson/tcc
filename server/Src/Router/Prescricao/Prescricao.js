const express = require("express");
const { verificaToken } = require("../../middleware/verificaToken");
const { prescricao_medicamentos, medicamentos } = require("../../../db/Prisma");
const { registraPrescricao, consultarPrescricao, listaTodasPrescricoes } = require("../../../db/prescricao/prescricao");
const { date } = require("zod");
const { consultarMedicamentosNome, registraMedicamento } = require("../../../db/medicamento/medicamento");
const { registraEstoque } = require("../../../db/estoque/estoque");
const { buscaTodasFarmacias } = require("../../../db/farmacia/farmacia");
const router = express.Router();


module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
    });

    router.post("/homepage/prescrever",verificaToken, async (req, res) => {
        try {
            const data = req.body
            data.funcionario_id = req.usuario
            data.status = 'Pendente'

            const trataPrescricao = {};
            trataPrescricao.paciente_id = data.paciente;
            trataPrescricao.funcionario_id = 1;
            trataPrescricao.status = 'Pendente';
            const newMedicamento = [];

            for (const e of data.medicamentos) {
                const med = await consultarMedicamentosNome(e.nome);
                if (med === null) {
                    const reg_medicamento = await registraMedicamento({ nome: e.nome, descricao: null, fabricante: null });
                    const list_farmacia = await buscaTodasFarmacias();
                    for (const farm of list_farmacia) {
                        await registraEstoque({ farmacia_id: farm.farmacia_id, medicamento_id: reg_medicamento.medicamento_id, quantidade: 0 });
                    }
                    newMedicamento.push({ medicamento_id: reg_medicamento.medicamento_id, quantidade: Number(e.quantidade), uso: e.uso });
                } else {
                    newMedicamento.push({ medicamento_id: med.medicamento_id, quantidade: Number(e.quantidade), uso: e.uso });
                }
            }
            trataPrescricao.medicamentos = newMedicamento;
            const prescricao = await registraPrescricao(trataPrescricao); 
            const consultaPrescricao = await consultarPrescricao(prescricao);
            
            io.emit('message',consultaPrescricao);


            res.status(201).json({ message: 'Prescrição cadastrada com sucesso' });

        } catch (error) {
            console.error('Erro ao cadastrar prescrição:', error);
            res.status(500).json({ message: 'Erro interno ao processar a requisição' });
        }
    });


    router.get("/homepage/lista/prescricao", async (req, res) => {
        try {
            const listaPrescricao = await listaTodasPrescricoes();
            console.log(listaPrescricao);
            res.status(200).json(listaPrescricao);
        } catch (error) {
            res.status(500).json({
                message: error.message || "Ocorreu um erro ao listar as prescrições."
            });
        }
    });

    router.get("/homepage/lista/prescricao/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const prescricao = await consultarPrescricao(id);
            
            console.log(prescricao);
            res.status(200).json(prescricao);
        } catch (error) {
            res.status(500).json({
                message: error.message || "Ocorreu um erro ao buscar prescrição."
            });
        }
    });

    return router
}
