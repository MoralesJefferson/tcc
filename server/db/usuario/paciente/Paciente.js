const prisma = require('../../Prisma');

const registraPaciente = async(pessoa) => {
    try {
        const paciente = await prisma.pessoas.create({
            data: {
                nm_pessoa: pessoa.nome,
                pacientes: {
                    create: {
                        cartao_sus:pessoa.cartao_sus
                    }
                }
            },
            include: {
                pacientes: {
                    select: {
                        cartao_sus: true,
                    }
                }
            }

        });
        return paciente
    } catch (error) {
        console.log('Erro ao cadastrar Paciente:', error);
    }
}

const buscaTodosPacientes = async () =>{
    try {
        const pacientes = await prisma.pessoas.findMany({
            where: {
                pacientes: {
                  isNot: null
                }
            },
            include:{
                pacientes:{
                    select:{
                        cartao_sus:true
                    }
                }
            }
        })
        return pacientes
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports ={
    registraPaciente,
    buscaTodosPacientes
}