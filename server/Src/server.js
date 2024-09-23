
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
});

const routerFuncionario = require("./Router/Funcionario/Funcionario");
const routerPaciente = require("./Router/Paciente/Paciente")(io);
const routerPrescricao = require("./Router/Prescricao/Prescricao")(io);
const routerMedicamento = require("./Router/Medicamento/Medicamento");
const routerFarmacia = require("./Router/Farmacia/Farmacia");

app.use(express.json());
app.use(cors());
app.use(routerPrescricao);
app.use(routerFuncionario.router);
app.use(routerPaciente);
app.use(routerMedicamento.router);
app.use(routerFarmacia.router);

const porta = 5008;
const host = "0.0.0.0";

server.listen(porta,()=>{
    console.log(`servidor rodando no endereço ${host}:${porta}`);
})

module.exports ={
    app
}