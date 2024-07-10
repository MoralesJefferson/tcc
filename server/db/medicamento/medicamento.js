const prisma = require('../Prisma');

async function registraMedicamentoEstoque(data) {
    try {
      let novoMedicamento;
    await prisma.$transaction(async (prisma) => {
      // Criar o medicamento
      novoMedicamento = await prisma.medicamentos.create({
        data: {
          nome:data.nome,
          descricao:data.descricao,
          fabricante:data.fabricante
        },
      });
  
      // Criar o estoque inicial
      await prisma.estoques.create({
        data: {
          farmacia_id: data.farmaciaId,
          medicamento_id: novoMedicamento.medicamento_id,
          quantidade: data.quantidadeInicial,
        },
      });
    });
  
    return novoMedicamento;    
    } catch (error) {
        console.log(error)
        return error
    }
    
  }

async function registraMedicamento(data) {
    try {
      novoMedicamento = await prisma.medicamentos.create({
        data:data
      })      
      return novoMedicamento;
    } catch (error) {
        console.log(error)
        return error
    }
    
  }

async function consultarMedicamentosComEstoque() {
    try {
        const medicamentosComEstoque = await prisma.medicamentos.findMany({
            include:{
                estoques:{
                    include: {
                        farmacias: true  // Incluir todos os campos da farmacia no estoque
                    }
                }
            }
        });
        return medicamentosComEstoque
    } catch (error) {
        console.error('Erro ao consultar medicamentos com estoque:', error);
    } 
}

async function consultarMedicamentosNome(nome) {
  try {
    const medicamentoNome = await prisma.medicamentos.findFirst({
      where: {
        nome: {
          contains: nome 
        }
      }
    });
    
    return medicamentoNome;
  } catch (error) {
    console.error('Erro ao consultar medicamentos pelo nome:', error);
  }
}


/*
// Atualizar a quantidade de um medicamento no estoque de uma farmácia
async function atualizarQuantidadeEstoque(estoqueId, novaQuantidade) {
  const estoqueAtualizado = await prisma.estoque.update({
    where: { estoque_id: estoqueId },
    data: {
      quantidade: novaQuantidade,
    },
  });
  return estoqueAtualizado;
}

// Deletar um medicamento do estoque de uma farmácia
async function deletarMedicamentoDoEstoque(estoqueId) {
  await prisma.estoque.delete({
    where: { estoque_id: estoqueId },
  });
}

// Buscar todos os medicamentos e seus estoques
async function buscarMedicamentosComEstoque() {
  const medicamentosComEstoque = await prisma.medicamento.findMany({
    include: {
      estoque: true,
    },
  });
  return medicamentosComEstoque;
}

// Exemplo de uso das funções
async function exemploUso() {
  // Criar um novo medicamento
  const novoMedicamento = await criarMedicamento('Paracetamol', 'Analgésico e antipirético', 'Genérico');
  console.log('Novo medicamento criado:', novoMedicamento);

  // Adicionar estoque do novo medicamento em uma farmácia
  const novoEstoque = await adicionarEstoque(1, novoMedicamento.medicamento_id, 100);
  console.log('Estoque adicionado:', novoEstoque);

  // Atualizar a quantidade de estoque
  const estoqueAtualizado = await atualizarQuantidadeEstoque(novoEstoque.estoque_id, 150);
  console.log('Estoque atualizado:', estoqueAtualizado);

  // Deletar o medicamento do estoque
  await deletarMedicamentoDoEstoque(novoEstoque.estoque_id);
  console.log('Medicamento removido do estoque.');

  // Buscar todos os medicamentos com seus estoques
  const medicamentosComEstoque = await buscarMedicamentosComEstoque();
  console.log('Medicamentos com estoque:', medicamentosComEstoque);
}

// Executar o exemplo
exemploUso()
  .catch((err) => {
    console.error('Erro:', err);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Desconectar o Prisma Client
  });
*/
  module.exports ={
    registraMedicamentoEstoque,
    registraMedicamento,
    consultarMedicamentosComEstoque,
    consultarMedicamentosNome
    
}