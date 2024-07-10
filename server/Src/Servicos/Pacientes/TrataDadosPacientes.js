
const validaDadosRegistroPaciente = (data) =>{
    if(!data.nome){
      return {"error":"Nome é obrigatorio!!!"}
    }
    //tratar dados de cpf data cartão do sus caso venha!!!
    return data
}

module.exports={
    validaDadosRegistroPaciente
}