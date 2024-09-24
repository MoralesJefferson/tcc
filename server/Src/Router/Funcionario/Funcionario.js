const express = require("express");
require('dotenv').config();
const router = express.Router(); 
const jwt = require("jsonwebtoken")
const z = require ('zod');
const { alteraFuncionario, deletaFuncionario, registraFuncionario, buscaTodosFuncionarios, buscaFuncionarioId } = require("../../../db/usuario/funcionario/Funcionario");
const { validaDadosRegistroUsuario, verificaLogin } = require("../../Servicos/funcionarios/TrataDadosFuncionario");
const { verificaToken } = require("../../middleware/verificaToken");

//valida dados e seus tipos
const usuarioEsquema = z.object({
    nome: z.string().trim().min(3),
    email: z.string().email(),
    senha: z.string().trim(),
    funcao:z.string().optional(),
    crm:z.string().optional(),
    crf:z.string().optional(),
    administrador:z.boolean().optional(),
    estado: z.string()
})
const usuarioLogin = z.object({
    email: z.string().email(),
    senha: z.string().trim(),
})


router.post("/funcionario/registro", async (req,res)=>{
    try {
        const data = usuarioEsquema.parse(req.body);
        const usuario = await validaDadosRegistroUsuario(data);
        
       if (usuario.error){
            console.log(usuario.error)
            return res.status(400).json(usuario.error);
        }
        const novoUsuario = await registraFuncionario(data)
        res.status(201).send(novoUsuario);
        

    }catch (error) {
        
        if (error instanceof z.ZodError) {
            console.log(error.errors[0].message)
            res.status(422).json(error.errors[0].message)
            return   
        }else{
            console.log(error)
            res.status(500).json({
                "message": error
            });
        }
    }
});

router.post('/funcionario/login', async (req,res)=>{
    try {
        
        const data = usuarioLogin.parse(req.body);

        usuario = await verificaLogin(data);
        
        if (usuario.error){
            return res.status(401).send(usuario);
        }

        console.log(usuario)
        const secret = process.env.SECRET;
        
        const token = jwt.sign({
            usuarioId:usuario.id,
        },secret,{expiresIn:1000});

        res.status(200).json({
            'token':token,
            'funcao':usuario.funcionarios.funcoes.nm_funcao,
            'success': true
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(422).json(error.errors[0].message)
            return   
        }else{
            console.log(error)
            res.status(500).json({
                "message": error
            });
        }
    }
    
    
})

//altera dados
router.put("/funcionario/atualiza:id", async(req,res)=>{
    try {
        const id = Number(req.params.id);
        const buscaUsuario = await buscaFuncionarioId(id);
          
        if (!buscaUsuario) {
            return res.status(400).send("usuario não encontrado");
        }
        const data = usuarioEsquema.parse(req.body);
        const validaUsuario = await validaDadosRegistroUsuario(data,id);
        console.log(validaUsuario)
        
        if (validaUsuario.error){
            return res.status(400).send(validaUsuario);
        }
        
        const usuarioAlterado = await alteraFuncionario(id, validaUsuario);
        /*
        */
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

router.delete("/funcionario/deleta/:id", async (req,res)=>{
    try {
        
        const id = Number(req.params.id);

        const buscaUsuario = await buscaFuncionarioId(id);
        
        if (!buscaUsuario) {
            return res.status(400).send("usuario não encontrado");
        }

        await deletaFuncionario(id)

        res.status(200).send("usuario apagado com sucesso!!!")

    } catch (error) {
        res.status(500).json({
            "message": error
        });
    }
    

});

//lista todos usuarios
router.get("/funcionario/lista/",async (req,res)=>{
    try {
        const listaUsuarios = await buscaTodosFuncionarios()    
        res.status(200).send(listaUsuarios)
        
    } catch (error) {
        console.log("erro",error);

    }
});

//lista usuario por id
router.get("/funcionario/lista/:id",  async (req,res)=>{
    try {
        const id = Number(req.params.id);
        const usuario = await buscaFuncionarioId(id);
        if (!usuario){
            return res.status(400).send("usuario não encontrado");
        }
        res.status(200).send(usuario)    
    } catch (error) {
        res.status(500).send("error!!", error)
    }
    
})

module.exports ={
    router
}