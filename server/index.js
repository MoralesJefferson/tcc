const {app} = require("./server");
const porta = 3600;
const host = "127.0.0.1";

app.listen(porta,host,()=>{
    console.log(`servidor rodando no endereço ${host}:${porta}`);
})