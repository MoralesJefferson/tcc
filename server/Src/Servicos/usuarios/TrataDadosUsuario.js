//const { registraUsuario, buscaUsuarioEmail } = require("../../db/usuario/Usuario");

const { buscaUsuarioEmail} = require("../../../db/usuario/Usuario")
const { geraHash, comparaHash } = require("./Hash")

const validaDadosRegistroUsuario = async(data, id = null) =>{
    
    const email = await buscaUsuarioEmail(data.email)
    
    if (!id) {
        
        if(email){
            
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
                if(data.crm){
                    data.crm = data.crm.replace() + '-' + data.estado;
                    data.crf=null ;
                }else{
                 
                    return {"error":"CRM obrigatorio!!!"}
                }
            }else{
                if(data.crf){
                    data.crf = data.crf + '-' + data.estado;
                    data.crm =null ;
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
    
    const {funcao,estado, ...filterData} = data;

    return filterData

}

const verificaLogin =async(data)=>{
    const usuario = await buscaUsuarioEmail(data.email) 
    if(!usuario){
        return {"error":"Email não encontrado!!!"} 
    }
    const verificaSenha = await comparaHash(data.senha,usuario.senha)
    
    if(!verificaSenha ){
        return {"error":"senha invalida!!!"}
    }
    return usuario
}


module.exports={
    validaDadosRegistroUsuario,
    verificaLogin
}