
const express = require('express');
const cors = require('cors');
const routerFuncionario = require("./Router/Funcionario/Funcionario");
const routerPrescricao = require("./Router/Prescricao/Prescricao")

const app = express();

app.use(express.json());
app.use(cors());
app.use(routerPrescricao.router);
app.use(routerFuncionario.router);

module.exports ={
    app
}