const express = require("express");
const router = express.Router(); 
const z = require ('zod');
const { registraUsuario, buscaUsuarioEmail, alteraUsuario, buscaTodosUsuarios, buscaUsuarioId, deletaUsuario } = require("../../../db/usuario/Usuario");
const { validaDadosRegistroUsuario } = require("../../Servicos/usuarios/TrataDadosUsuario");

//valida dados e seus tipos

const usuarioEsquema = z.object({
    nome: z.string().trim().min(3),
    email: z.string().email(),
    senha: z.string().trim(),
    funcao:z.string(),
    crm:z.string().optional(),
    crf:z.string().optional(),
    administrador:z.boolean().optional(),
    estado: z.string()
})

//registra um novo usuario

router.post("/usuario/registro", async (req,res)=>{
    try {
        const data = usuarioEsquema.parse(req.body);
        const validaUsuario = await validaDadosRegistroUsuario(data);

        if (validaUsuario.error){
            return res.status(400).send(validaUsuario);
        }
        
        const novoUsuario = await registraUsuario(validaUsuario)
        res.status(201).send(validaUsuario);

    }catch (error) {
        
        if (error instanceof z.ZodError) {
            res.status(422).json(error.errors[0].message)
            return   
        }else{
            res.status(500).json({
                "message": error
            });
        }
    }
});

//altera dados usuario

router.put("/usuario/altera/:id", async(req,res)=>{
    try {
        const id = Number(req.params.id);
        const buscaUsuario = await buscaUsuarioId(id);
        
        if (!buscaUsuario) {
            return res.status(400).send("usuario não encontrado");
        }

        const data = usuarioEsquema.parse(req.body);
        const validaUsuario = await validaDadosRegistroUsuario(data,id);
        
        if (validaUsuario.error){
            return res.status(400).send(validaUsuario);
        }

        const usuarioAlterado = await alteraUsuario(id, validaUsuario);
        res.status(200).send(usuarioAlterado);
    
    } catch (error) {
        
        if (error instanceof z.ZodError) {
            res.status(422).json(error.errors[0].message)
            return   
        }else{
            res.status(500).json({
                "message": error
            });
        }
    }
});

//apaga usuario

router.delete("/usuario/deleta/:id", async (req,res)=>{
    try {
        const id = Number(req.params.id);

        const buscaUsuario = await buscaUsuarioId(id);
        
        if (!buscaUsuario) {
            return res.status(400).send("usuario não encontrado");
        }

        await deletaUsuario(id);

        res.status(200).send("usuario apagado com sucesso!!!")

    } catch (error) {
        res.status(500).json({
            "message": error
        });
    }
    
});


















//lista todos usuarios
router.get("/busca",async (req,res)=>{
    const listaUsuarios = await buscaTodosUsuarios()    
    //console.log("chamou rota",listaUsuarios);
    res.status(200).send(listaUsuarios)
});


module.exports ={
    router
}