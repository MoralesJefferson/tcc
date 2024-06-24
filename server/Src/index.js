const {app} = require("./server");
const porta = 5008;
const host = "0.0.0.0";

app.listen(porta,host,()=>{
    console.log(`servidor rodando no endereço ${host}:${porta}`);
})