//const { registraUsuario, buscaUsuarioEmail } = require("../../db/usuario/Usuario");

const { buscaFuncionarioEmail} = require("../../../db/usuario/funcionario/Funcionario")
const { geraHash, comparaHash } = require("./Hash")

const validaDadosRegistroUsuario = async(data, id = null) =>{
    
    const {usuario,error} = await buscaFuncionarioEmail(data.email)
    
    if(error){
        return {"error":error}        
    }
    
    if (!id) {
        
        if(usuario){
            return {"error":"Email ja possui cadastro!!!"} 
        }
    }
    
    if(data.senha){
        data.senha = await geraHash(data.senha);
    }else{
        
    return {"error":"Senha é obrigatorio!!!"}
    }
   
    if(!data.nome){
      
    return {"error":"Nome é obrigatorio!!!"}
}


if(data.estado){
    data.estado = data.estado.replace(/\s+/g, '')
    if (data.estado.length !== 0){
            if(data.funcao === 'medico'){
                data.funcao = 2
                if(data.crm){
                    data.codigo = data.crm.replace() + '-' + data.estado;
                    
                }else{
                    
                return {"error":"CRM obrigatorio!!!"}
            }
        }else{
            data.funcao = 3
        if(data.crf){
                    data.codigo = data.crf + '-' + data.estado;
                }else{
                    
                return {"error":"CRF obrigatorio!!!"}
                }
            }
        }
    }else{
        return {"error":"UF obrigatorio!!!"}
        
    }
    
    if(!data.administrador){
        data.administrador = false
    }
    
    const {estado,crm,crf, ...filterData} = data;
    
    return filterData
    
    
}

const verificaLogin =async(data)=>{
    const {usuario , error}= await buscaFuncionarioEmail(data.email) 

    if(error){
        return {"error":error}        
    }

    if(!usuario){
        return {"error":"Email não encontrado!!!"} 
    }
    const verificaSenha = await comparaHash(data.senha,usuario.funcionarios.senha)
    
    if(!verificaSenha){
        return {"error":"senha Invalida!!!"}
    }
    return usuario
}


module.exports={
    validaDadosRegistroUsuario,
    verificaLogin
}