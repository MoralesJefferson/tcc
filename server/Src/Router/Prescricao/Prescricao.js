const express = require("express");
const { verificaToken } = require("../../middleware/verificaToken");
const { prescricao_medicamentos, medicamentos } = require("../../../db/Prisma");
const { registraPrescricao, consultarPrescricao, listaTodasPrescricoes } = require("../../../db/prescricao/prescricao");
const { date } = require("zod");
const { consultarMedicamentosNome, registraMedicamento } = require("../../../db/medicamento/medicamento");
const { registraEstoque } = require("../../../db/estoque/estoque");
const { buscaTodasFarmacias } = require("../../../db/farmacia/farmacia");
const router = express.Router();

// Endpoint para cadastrar prescrição
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
        await registraPrescricao(trataPrescricao);

        res.status(201).json({ message: 'Prescrição cadastrada com sucesso' });

    } catch (error) {
        console.error('Erro ao cadastrar prescrição:', error);
        res.status(500).json({ message: 'Erro interno ao processar a requisição' });
    }
});

// Rota para listar todas as prescrições
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

/*const express = require("express");
const { verificaToken } = require("../../middleware/verificaToken");
const { prescricao_medicamentos, medicamentos } = require("../../../db/Prisma");
const { registraPrescricao, consultarPrescricao, listaTodasPrescricoes } = require("../../../db/prescricao/prescricao");
const { date } = require("zod");
const { consultarMedicamentosNome, registraMedicamento } = require("../../../db/medicamento/medicamento");
const { registraEstoque } = require("../../../db/estoque/estoque");
const { buscaTodasFarmacias } = require("../../../db/farmacia/farmacia");
const router = express.Router(); 

router.get("/homepage/prescrever", async (req,res)=>{
    try {
        console.log(req.body)
        const data={
            paciente: 1,
            medicamentos: [
         /*0*/    /* { nome: 'paracetamol', quantidade: '4', uso: '2 vezes por dia' },
         /*1*/    /* { nome: 'ibuprofeno', quantidade: '5', uso: 'toda hora' },
         /*2*/     /*{ nome: 'amoxicilina', quantidade: '4', uso: 'todo dia' },
         /*3*/     /*{ nome: 'torsilax', quantidade: '8', uso: 'só se tiver dor' }
  /*          ]
          }
    const trataPrescricao={}
    trataPrescricao.paciente_id = data.paciente
    trataPrescricao.funcionario_id = 2
    trataPrescricao.status ='Pendente';
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
    await registraPrescricao(trataPrescricao)
    
    res.status(201).send('prescreveu');

    }catch (error) {
        res.status(500).json({
            "message": error
        });
    }
    
});*/
/*
router.get("/homepage/lista/prescricao", async (req,res)=>{
    const listaPrescricao = await listaTodasPrescricoes()
        console.log(listaPrescricao)
    
})
*/

module.exports ={
    router
}