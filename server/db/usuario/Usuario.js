const prisma = require('../Prisma');

const registraUsuario = async (usuario) => {
    
    try {
        return await prisma.usuario.create({
            data:usuario
        })
    } catch (error) {
        console.log(error)
        return error
    }
    
};

const buscaUsuarioEmail = async (email) =>{
    try {
        return await prisma.usuario.findFirst({
            where:{
                email:email
            }
        })
    } catch (error) {
        return error
    }
}

const buscaTodosUsuarios = async () =>{
    try {
        return await prisma.usuario.findMany({})
    } catch (error) {
        return error
    }
}

const buscaUsuarioId = async (id) =>{
    return await prisma.usuario.findFirst({
        where:{
            id:id
        }
    })
}

const alteraUsuario = async (id, usuario) =>{
    try {
        return await prisma.usuario.update({
            where:{
                id:id
            },
            data:{
                id:id,
                nome:usuario.nome,
                email:usuario.email,
                crm:usuario.crm,
                crf:usuario.crf,
                administrador:usuario.administrador,
                senha:usuario.senha
            }
        })
    } catch (error) {
        console.log(error)
        return error       
    }
}

const deletaUsuario = async (id) =>{
    try {
        return await prisma.usuario.delete({
            where:{
                id:id
            }
        })        
    } catch (error) {
        console.log(error)
        return error 
    }
}

/*const main = async () => {
    const dados = await buscaUsuarioEmail('gimorales170607@gmail.com ');
    console.log(dados);
};

main();*/
module.exports ={
    registraUsuario,
    buscaUsuarioEmail,
    buscaTodosUsuarios,
    buscaUsuarioId,
    alteraUsuario,
    deletaUsuario
}