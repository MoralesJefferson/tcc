const express = require('express');
const cors = require('cors');
const routerUsuario = require("./Src/Router/Usuario/Usuario");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routerUsuario.router);

module.exports ={
    app
}