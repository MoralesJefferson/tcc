const express = require("express");
const router = express.Router(); 
const jwt = require("jsonwebtoken")
const z = require ('zod');
const { registraUsuario, buscaUsuarioEmail, alteraUsuario, buscaTodosUsuarios, buscaUsuarioId, deletaUsuario } = require("../../../db/usuario/Usuario");
const { validaDadosRegistroUsuario, verificaLogin } = require("../../Servicos/usuarios/TrataDadosUsuario");
const { verificaToken } = require("../../middleware/verificaToken");



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
const usuarioLogin = z.object({
    email: z.string().email(),
    senha: z.string().trim(),
})

//registra um novo usuario

router.post("/usuario/registro", async (req,res)=>{
    try {
        const data = usuarioEsquema.parse(req.body);
        const usuario = await validaDadosRegistroUsuario(data);
        
        if (usuario.error){
            return res.status(400).send(usuario);
        }
        
        const novoUsuario = await registraUsuario(usuario)
        res.status(201).send(novoUsuario);

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

router.post('/login', async (req,res)=>{
    try {
        
        const data = usuarioLogin.parse(req.body);

        
        usuario = await verificaLogin(data);
        
        
        if (usuario.error){
            return res.status(401).send(usuario);
        }

        const secret = process.env.SECRET;
        
        const token = jwt.sign({
            usuarioId:usuario.id
        },secret,{expiresIn:1000});

        res.status(200).json({
            'token':token,
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

router.get("/usuario/lista", verificaToken , async (req,res)=>{
    try {
        res.status(200).send("container funcionando com sucesso!!!")    
    } catch (error) {
        res.status(500).send("error!!", error)
    }
    
})


















//lista todos usuarios
router.get("/busca",verificaToken ,async (req,res)=>{
    try {
        const listaUsuarios = await buscaTodosUsuarios()    
        res.status(200).send(listaUsuarios)
        
    } catch (error) {
        console.log("erro",error);

    }
});


module.exports ={
    router
}