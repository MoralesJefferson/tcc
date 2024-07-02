
const express = require('express');
const cors = require('cors');
const routerUsuario = require("./Router/Usuario/Usuario");
const routerPrescricao = require("./Router/Prescricao/Prescricao")

const app = express();

app.use(express.json());
app.use(cors());
app.use(routerPrescricao.router);
app.use(routerUsuario.router);

module.exports ={
    app
}