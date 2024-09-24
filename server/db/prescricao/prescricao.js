const prisma = require("../Prisma");

const registraPrescricao = async (data) => {
  try {
    const prescricao = await prisma.$transaction(async (prisma) => {
      const novaPrescricao = await prisma.prescricoes.create({
        data: {
          funcionario_id: data.funcionario_id,
          paciente_id: data.paciente_id,
          status: data.status,
          data_prescricao: new Date(),
        },
      });

      for (const medicamento of data.medicamentos) {
       
        await prisma.prescricao_medicamentos.create({
          data: {
            prescricao_id: novaPrescricao.prescricao_id,
            medicamento_id: medicamento.medicamento_id,
            quantidade: medicamento.quantidade,
            forma_uso: medicamento.forma_uso,
          },
        });
      }

      await prisma.status_prescricao_historico.create({
        data: {
          prescricao_id: novaPrescricao.prescricao_id,
          funcionario_id: data.funcionario_id,
          status: "Criada",
          data_alteracao: new Date(),
        },
      });

      return novaPrescricao.prescricao_id;
    });
    
    return prescricao;

  } catch (error) {
    console.log("Erro ao cadastrar prescrição:", error);
  }
};

const editaPrescricao = async (id, medicamentos) => {
  try {
    
    await prisma.$transaction(async (tx) => {
      
      await tx.prescricao_medicamentos.deleteMany({
        where: { prescricao_id: id },
      });
      for (const medicamento of medicamentos) {      
        await tx.prescricao_medicamentos.create({
          data: {
            prescricao_id: id,
            medicamento_id: medicamento.medicamento_id,
            quantidade: medicamento.quantidade,
            forma_uso: medicamento.forma_uso,
          },
        });
      }
    });

    
    return{ message: 'Prescrição editada com sucesso' };
  } catch (error) {
    console.log(error);
    return error
  }
};
const baixarPrescricao = async(id)=>{
    try {

      await prisma.prescricoes.update({
        where:{prescricao_id:id},
        data:{
          status:'Entregue'
        }
      })

      return{ message: 'Prescrição baixada com sucesso' };
    } catch (error) {
      console.log(error);
      return error
    }
}


const deletePrescricao = async(id)=>{
  try {
    console.log(id)
    await prisma.$transaction(async (tx) => {
      
      await tx.prescricao_medicamentos.deleteMany({
        where: { prescricao_id: id },
      });

      await tx.status_prescricao_historico.deleteMany({
        where: { prescricao_id: id },
      });     
      
      await tx.prescricoes.deleteMany({
        where:{prescricao_id:id}
      })
      
    });

    return{ message: 'Prescrição deletada com sucesso' };
  } catch (error) {
    console.log(error);
    return error
  }
}

const consultarPrescricao = async (prescricao_id) => {
  try {
    const prescricao = await prisma.$queryRaw`
    
    select p.data_prescricao data, 
           p.status ,
		       pm.forma_uso , 
           pm.quantidade ,
           paciente.nm_pessoa paciente, 
           paciente.dt_nascimento, 
           funcionario.nm_pessoa funcionario,
		       m.nome
    from 
      prescricao_medicamentos pm 
    join 
      prescricoes p on pm.prescricao_id = p.prescricao_id 
    join 
      medicamentos m on pm.medicamento_id = m.medicamento_id
    join 
      pacientes pac on p.paciente_id = pac.pessoa_id
    join 
      pessoas paciente on pac.pessoa_id = paciente.id
    join 
      funcionarios fun on p.funcionario_id = fun.pessoa_id
    join 
      pessoas funcionario  on fun.pessoa_id = funcionario.id
    where 
      p.prescricao_id = ${prescricao_id}`;

    const formatedPrescricao = {
      prescricao_id:prescricao_id,
      data_prescricao: prescricao[0].data,
      status: prescricao[0].status,
      funcionario_nome: prescricao[0].funcionario,
      paciente_nome: prescricao[0].paciente,
      dt_nascimento: prescricao[0].dt_nascimento,
      medicamentos: prescricao.map((med) => ({
        nome: med.nome,
        forma_uso: med.forma_uso,
        quantidade: med.quantidade,
      })),
    };
   
    return formatedPrescricao;

  } catch (error) {
    console.error("Erro ao consultar prescrição:", error);
  }
};

const listaTodasPrescricoes = async () => {
  try {

    const prescricoes = await prisma.prescricoes.findMany({
      include: {
        funcionarios: {
          select: {
            pessoas: {
              select: {
                nm_pessoa: true,
              },
            },
          },
        },
        pacientes: {
          select: {
            cartao_sus:true,
            pessoas: {
              select: {
                nm_pessoa: true,
                dt_nascimento:true,
              },
            },
          },
        },
        prescricao_medicamentos: {
          include: {
            medicamentos: true,
          },
        },
        status_prescricao_historico: {
          include: {
            funcionarios: {
              select: {
                pessoas: {
                  select: {
                    nm_pessoa: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        prescricao_id: "desc", 
      },
    });
    const formattedPrescricoes = prescricoes.map((prescricao) => ({
      prescricao_id: prescricao.prescricao_id,
      funcionario_nome: prescricao.funcionarios.pessoas.nm_pessoa,
      paciente_nome: prescricao.pacientes.pessoas.nm_pessoa,
      cartao_sus: prescricao.pacientes.cartao_sus,
      dt_nascimento:prescricao.pacientes.pessoas.dt_nascimento,
      data_prescricao: prescricao.data_prescricao,
      status: prescricao.status,
      medicamentos: prescricao.prescricao_medicamentos.map((pm) => ({
        nome: pm.medicamentos.nome,
        descricao: pm.medicamentos.descricao,
        fabricante: pm.medicamentos.fabricante,
        quantidade: pm.quantidade,
        forma_uso: pm.forma_uso,
      })),
      historico_status: prescricao.status_prescricao_historico.map((sh) => ({
        status: sh.status,
        data_alteracao: sh.data_alteracao,
        funcionario_nome: sh.funcionarios.pessoas.nm_pessoa,
      })),
    }));

    return formattedPrescricoes;

  } catch (error) {
    console.error("Erro ao consultar prescrições:", error);
    throw error;
  }
};

module.exports = {
  registraPrescricao,
  consultarPrescricao,
  listaTodasPrescricoes,
  editaPrescricao,
  deletePrescricao,
  baixarPrescricao 
};
