const prisma = require('../Prisma');


const registraPrescricao = async(data) => {
    try {
      await prisma.$transaction(async (prisma) => {
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
              forma_uso: medicamento.uso,
            },
          });
        }

        await prisma.status_prescricao_historico.create({
          data: {
            prescricao_id: novaPrescricao.prescricao_id,
            funcionario_id: data.funcionario_id,
            status: 'Criada',
            data_alteracao: new Date(),
          },
        });



      })

      console.log('Prescrição, medicamentos e histórico de status registrados com sucesso.');
     // console.log(data.funcionario_id)
      /*  // Iniciar uma transação
        await prisma.$transaction(async (prisma) => {
          // Inserir a prescrição
          const novaPrescricao = await prisma.prescricoes.create({
            data: {
              funcionario_id: data.funcionario_id,
              paciente_id: data.paciente_id,
              data_prescricao: new Date(),
              status: data.status,
            },
          });
    
          const prescricao_id = novaPrescricao.prescricao_id;
    
          // Inserir os medicamentos
          for (const medicamento of data.medicamentos) {
            await prisma.prescricao_medicamentos.create({
              data: {
                prescricao_id: prescricao_id,
                medicamento_id: medicamento.medicamento_id,
                quantidade: medicamento.quantidade,
                forma_uso:medicamento.uso
              },
            });
          }
    
          // Inserir o histórico de status
          await prisma.status_prescricao_historico.create({
            data: {
              prescricao_id: prescricao_id,
              funcionario_id:data.funcionario_id,
              status: data.status,
              data_alteracao: new Date(),
            },
          });
        });
    */
        //console.log('Prescrição cadastrada com sucesso!');
      
    } catch (error) {
        console.error('Erro ao cadastrar prescrição:', error);
    }
    /* try {
        const prescrevendo = await prisma.$transaction(async (prisma) => {

            const prescrito = await prisma.prescricoes.create({
                data: {
                    funcionario_id:prescricao.funcionario_id,
                    paciente_id:prescricao.paciente_id,
                    data_prescricao: new Date,
                    status:prescricao.status, 
                }
            });
            const medicamentos.map


        });
        //console.log(prescrito)
        //return prescrito
    } catch (error) {
        console.log('Erro ao cadastrar prescricao:', error);
    }*/
}

const consultarPrescricao = async (prescricao_id) => {
   
  try {
    const prescricao = await prisma.prescricoes.findUnique({
      where: { prescricao_id: prescricao_id },
      include: {
        funcionarios: {
          select: {
            pessoas: {
              select: {
                nm_pessoa: true
              }
            }
          }
        },
        pacientes: {
          select: {
            pessoas: {
              select: {
                nm_pessoa: true
              }
            }
          }
        },
        prescricao_medicamentos: {
          include: {
            medicamentos: true
          }
        },
        status_prescricao_historico: {
          include: {
            funcionarios: {
              select: {
                pessoas: {
                  select: {
                    nm_pessoa: true
                  }
                }
              }
            }
          }
        }
      }
    });
    const formattedPrescricao = {
        prescricao_id: prescricao.prescricao_id,
        funcionario_nome: prescricao.funcionarios.pessoas.nm_pessoa,
        paciente_nome: prescricao.pacientes.pessoas.nm_pessoa,
        data_prescricao: prescricao.data_prescricao,
        status: prescricao.status,
        medicamentos: prescricao.prescricao_medicamentos.map(pm => ({
          nome: pm.medicamentos.nome,
          descricao: pm.medicamentos.descricao,
          fabricante: pm.medicamentos.fabricante,
          quantidade: pm.quantidade
        })),
        historico_status: prescricao.status_prescricao_historico.map(sh => ({
          status: sh.status,
          data_alteracao: sh.data_alteracao,
          funcionario_nome: sh.funcionarios.pessoas.nm_pessoa
        }))
      };


      console.log('Dados da prescrição:', formattedPrescricao);
    } catch (error) {
      console.error('Erro ao consultar prescrição:', error);
    }
  }

  const listaTodasPrescricoes = async () => {
    try {
      /*const prescricoes = await prisma.$queryRaw`
    SELECT 
      p1.nm_pessoa AS medico, 
      p2.nm_pessoa AS paciente, 
      pr.data_prescricao, 
      pr.status,
      m.medicamento_id,
      m.nome AS nome_medicamento,
      pm.quantidade AS quantidade_prescrita,
      pm.forma_uso
    FROM 
      prescricoes pr
    JOIN 
      funcionarios f1 ON pr.funcionario_id = f1.pessoa_id
    JOIN 
      pessoas p1 ON f1.pessoa_id = p1.id
    JOIN 
      pacientes pass ON pr.paciente_id = pass.pessoa_id
    JOIN 
      pessoas p2 ON pass.pessoa_id = p2.id
    left JOIN 
      prescricao_medicamentos pm ON pr.prescricao_id = pm.prescricao_id
    left JOIN 
      medicamentos m ON pm.medicamento_id = m.medicamento_id
  `;

  // Agrupa os dados
  const resultado = prescricoes.reduce((acc, item) => {
    // Cria um identificador único para cada prescrição
    const chavePrescricao = `${item.data_prescricao}-${item.medico}-${item.paciente}`;

    if (!acc[chavePrescricao]) {
      acc[chavePrescricao] = {
        medico: item.medico,
        paciente: item.paciente,
        data_prescricao: item.data_prescricao,
        status: item.status,
        medicamentos: []
      };
    }

    acc[chavePrescricao].medicamentos.push({
      medicamento_id: item.medicamento_id,
      nome_medicamento: item.nome_medicamento,
      quantidade_prescrita: item.quantidade_prescrita,
      forma_uso: item.forma_uso
    });

    return acc;
  }, {});

  // Converte o resultado para um array
  const resultadoFormatado = Object.values(resultado);

  console.log(resultadoFormatado);

  
      */
      const prescricoes = await prisma.prescricoes.findMany({
        include: {
          funcionarios: {
            select: {
              pessoas: {
                select: {
                  nm_pessoa: true
                }
              }
            }
          },
          pacientes: {
            select: {
              pessoas: {
                select: {
                  nm_pessoa: true
                }
              }
            }
          },
          prescricao_medicamentos: {
            include: {
              medicamentos: true,
            }
          },
          status_prescricao_historico: {
            include: {
              funcionarios: {
                select: {
                  pessoas: {
                    select: {
                      nm_pessoa: true
                    }
                  }
                }
              }
            }
          }
          }
        });
        
      const formattedPrescricoes = prescricoes.map(prescricao => ({
        prescricao_id: prescricao.prescricao_id,
        funcionario_nome: prescricao.funcionarios.pessoas.nm_pessoa,
        paciente_nome: prescricao.pacientes.pessoas.nm_pessoa,
        data_prescricao: prescricao.data_prescricao,
        status: prescricao.status,
        medicamentos: prescricao.prescricao_medicamentos.map(pm => ({
          nome: pm.medicamentos.nome,
          descricao: pm.medicamentos.descricao,
          fabricante: pm.medicamentos.fabricante,
          quantidade: pm.quantidade,
          forma_uso: pm.forma_uso // Incluindo o campo forma_uso
        })),
        historico_status: prescricao.status_prescricao_historico.map(sh => ({
          status: sh.status,
          data_alteracao: sh.data_alteracao,
          funcionario_nome: sh.funcionarios.pessoas.nm_pessoa
        }))
      }));
  
      console.log('Dados das prescrições:', formattedPrescricoes);
      return formattedPrescricoes;
      
    } catch (error) {
      console.error('Erro ao consultar prescrições:', error);
      throw error;
    }
  };
  

module.exports ={
    registraPrescricao,
    consultarPrescricao,
    listaTodasPrescricoes
}