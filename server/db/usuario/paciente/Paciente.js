const prisma = require('../../Prisma');

const registraPaciente = async(pessoa) => {
    try {
        const paciente = await prisma.pessoas.create({
            data: {
                nm_pessoa: pessoa.nome,
                cpf:pessoa.cpf,
                dt_nascimento:new Date(pessoa.dt_nascimento),
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

const buscaPacienteId = async (id) => {
    try {
        const paciente = await prisma.$queryRaw`
            
            select  pac.pessoa_id id,
		            p.nm_pessoa nm_pessoa,
                    p.cpf cpf,
                    p.dt_nascimento dt_nascimento,
                    pac.cartao_sus cartao_sus 
            from 
	            pacientes pac
            join
	            pessoas p on pac.pessoa_id = p.id
            where 
	            p.id = ${id}
        `;
    
        return paciente;
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
    }
};

const editaPaciente = async (id, novosDados) => {
    
    const transaction = await prisma.$transaction(async (tx) => {
        await tx.$executeRaw`
            UPDATE pessoas
            SET nm_pessoa = ${novosDados.nome}, cpf = ${novosDados.cpf}, dt_nascimento = ${novosDados.dt_nascimento}
            WHERE id = ${id}
        `;

        await tx.$executeRaw`
            UPDATE pacientes
            SET cartao_sus = ${novosDados.cartao_sus}
            WHERE pessoa_id = ${id}
        `;
    });

    return transaction;
};
 
const removerPaciente = async (id) => {
    try {
        // Usamos uma transação para garantir que ambos os registros sejam excluídos com sucesso
        const transaction = await prisma.$transaction(async (tx) => {
            // Primeiro, removemos o paciente da tabela 'pacientes'
            await tx.pacientes.delete({
                where: {
                    pessoa_id: id
                }
            });

            // Em seguida, removemos a pessoa da tabela 'pessoas'
            await tx.pessoas.delete({
                where: {
                    id: id
                }
            });
        });

        return { message: 'Paciente removido com sucesso!' };
    } catch (error) {
        console.error('Erro ao remover paciente:', error);
        throw error;  // Para permitir tratamento de erro adequado fora da função
    }
};

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

        const newPacientes = pacientes.map((pac)=>{
            const data = new Date(pac.dt_nascimento).toISOString().split('T')[0]
            const [ano, mes, dia] = data.split('-');
            const dataFormatada = `${dia}-${mes}-${ano}`;

            return{
                id:pac.id,
                nm_pessoa:pac.nm_pessoa,
                cpf:pac.cpf,
                dt_nascimento:dataFormatada,
                cartao_sus:pac.pacientes.cartao_sus
            }
        })
    
        return newPacientes
        
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports ={
    registraPaciente,
    buscaTodosPacientes,
    buscaPacienteId,
    editaPaciente,
    removerPaciente
}