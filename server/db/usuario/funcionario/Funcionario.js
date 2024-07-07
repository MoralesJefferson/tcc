const prisma = require('../../Prisma');

const registraFuncionario = async(pessoa) => {
    try {
        const funcionario = await prisma.pessoas.create({
            data: {
                nm_pessoa: pessoa.nome,
                funcionarios: {
                    create: {
                        email: pessoa.email,
                        senha: pessoa.senha,
                        administrador: pessoa.administrador,
                        reg_profissional:pessoa.codigo,
                        funcao_id:Number(pessoa.funcao)
                    }
                }
            },
            include: {
                funcionarios: {
                    select: {
                        email: true,
                        senha: true,
                        reg_profissional: true,
                        administrador: true,
                        funcoes: {
                            select: {
                                nm_funcao: true
                            }
                        }
                    }
                }
            }
        });
        return funcionario
    } catch (error) {
        console.log('Erro ao cadastrar funcionario:', error);
    }
}

const buscaFuncionarioEmail = async (e_mail) =>{
    try {
        const usuario = await prisma.pessoas.findFirst({
            where:{
                funcionarios:{
                    email:e_mail
                }
            },
            include:{
                funcionarios:{
                    select:{
                        email:true,
                        senha:true,
                        reg_profissional:true,
                        administrador:true,
                        funcoes:{
                            select:{
                                nm_funcao:true
                            }
                        }
                    },
                }
            }    
        })
        return { usuario, error:null }
    } catch (error) {
        console.log(error)
        return { "usuario":null, "error":error }
    }
}

const buscaTodosFuncionarios = async () =>{
    try {
        const funcionarios = await prisma.pessoas.findMany({
            include:{
                funcionarios:{
                    select:{
                        email:true,
                        senha:true,
                        reg_profissional:true,
                        administrador:true,
                        funcoes:{
                            select:{
                                nm_funcao:true
                            }
                        }
                    }
                }
            }
        })
        return funcionarios
    } catch (error) {
        console.log(error)
        return error
    }
}

const buscaFuncionarioId = async (id) =>{
    return await prisma.pessoas.findFirst({
        where:{
            id:id
        },
        include:{
            funcionarios:{
                select:{
                    email:true,
                    senha:true,
                    reg_profissional:true,
                    administrador:true,
                    funcoes:{
                        select:{
                            nm_funcao:true
                        }
                    }
                },
            }
        }
    })
}

const alteraFuncionario = async (id, funcionario) =>{
    try {
        return await prisma.pessoas.update({
            where:{
                id:id
            },
            data:{
                id:id,
                nm_pessoa:funcionario.nome,
                funcionarios:{
                    update:{
                        email: funcionario.email,
                        senha: funcionario.senha,
                        administrador: funcionario.administrador,
                        reg_profissional:funcionario.codigo,
                        funcao_id:Number(funcionario.funcao)
                    }
                }
            },
            include: {
                funcionarios: {
                    select: {
                        email: true,
                        senha: true,
                        reg_profissional: true,
                        administrador: true,
                        funcoes: {
                            select: {
                                nm_funcao: true
                            }
                        }
                    }
                }
            }    
        })
    } catch (error) {
        console.log(error)
        return error       
    }
}

const deletaFuncionario = async (id) =>{
    try {
        const pessoaDeletada = await prisma.$transaction(async (prisma) => {
            await prisma.funcionarios.delete({
                where:{
                    pessoa_id:id
                },
            })
            
            await prisma.pessoas.delete({
                where:{
                    id:id
                }
            }) 
        })
        
        return pessoaDeletada     
    
    } catch (error) {
        console.log(error)
        return error 
    }
}
module.exports ={
    registraFuncionario,
    buscaFuncionarioEmail,
    buscaTodosFuncionarios,
    buscaFuncionarioId,
    alteraFuncionario,
    deletaFuncionario
}