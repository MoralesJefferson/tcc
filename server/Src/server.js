
const express = require('express');
const cors = require('cors');
const routerFuncionario = require("./Router/Funcionario/Funcionario");
const routerPaciente = require("./Router/Paciente/Paciente");
const routerPrescricao = require("./Router/Prescricao/Prescricao")
const routerMedicamento = require("./Router/Medicamento/Medicamento")
const routerFarmacia =require("./Router/Farmacia/Farmacia")


const app = express();

app.use(express.json());
app.use(cors());
app.use(routerPrescricao.router);
app.use(routerFuncionario.router);
app.use(routerPaciente.router);
app.use(routerMedicamento.router);
app.use(routerFarmacia.router);



module.exports ={
    app
}