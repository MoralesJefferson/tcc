import Axios from "axios";

export const fetchMedicamentos = async (setListaMedicamentos) => {
    try { 
        const response = await Axios.get("http://localhost:5008/medicamento/lista/");
        const remedio = response.data.map(element => ({ nome: element.nome }));
        console.log(remedio)
        setListaMedicamentos(remedio);
    } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
    }
};

export const handleInputChange = (medicamentos, setMedicamentos, index, field, value) => {
    const values = [...medicamentos];
    if (field === 'medicamento') {
        values[index].nome = value;
    } else if (field === 'quantidade') {
        values[index].quantidade = value;
    } else if (field === 'forma_uso') {
        values[index].forma_uso = value;
    }
    setMedicamentos(values);
};

export const removerCampos = (medicamentos, setMedicamentos, index) => {
    const values = [...medicamentos];
    values.splice(index, 1);
    setMedicamentos(values);
};

export const adicionaMedicamento = (medicamentos, setMedicamentos, bottomFormRef) => {
    setMedicamentos([...medicamentos, { nome: "", quantidade: "", forma_uso: "" }]);
    setTimeout(() => {
        if (bottomFormRef.current) {
            bottomFormRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, 100);
};

export const tratarPrescricao = (paciente,medicamentos) => {
    const dados={};
    if (paciente) {
        dados.paciente = Number(paciente);
    } else {
        return {error:"Nome do paciente é obrigatório"}
    }
  
    if (medicamentos.some((med) => med.nome.trim() !== "" && med.forma_uso.trim() !== "")) {
        dados.medicamentos = [...medicamentos];
    } else {
        return {error:"Adicionar medicamento e sua forma de uso é obrigatório"};
    }
    return dados;
};