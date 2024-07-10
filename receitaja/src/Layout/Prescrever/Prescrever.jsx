import {  useEffect, useState } from 'react';
import PacienteModal from '../Paciente/PacienteModal';
import './Prescrever.css';
import Button from '../../Components/TagsHtml/Buttons/Button';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const Prescrever = () => {
    const [medicamentos, setMedicamentos] = useState([{ nome: '',quantidade:'', uso: '' }]);
    const [pacientes, setPacientes] = useState([]);
    const [paciente,setPaciente] = useState();
    const [showModal,setShowModal]=useState(false); 
    const [listaMedicamentos,setListaMedicamentos]=useState([{'nome':''}])
    const medica = 4;

// carrega medicamentos existentes
    const fetchMedicamentos = () => {
        Axios.get('http://localhost:5008/medicamento/lista/',{})
            .then(response => {
                let remedio =[]
                const resposta = response.data
                resposta.forEach(element => {
                    remedio.push({"nome":element.nome}) 
                });
                
                setListaMedicamentos(remedio);

                
            
            })
            .catch(error => {
                console.error('Erro ao buscar medicamentos:', error);
            });
    };
// carrega select com usuarios existentes
    const fetchPacientes = () => {
        Axios.get('http://localhost:5008/paciente/lista/',{})
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error);
            });
    };

    useEffect(() => {
        fetchMedicamentos()
        fetchPacientes()
    }, []);

//adiciona medicamento ao meu state
    const handleInputChange = (index, field, value) => {
        const values = [...medicamentos];
        if (field === 'medicamento') {
            values[index].nome = value;
        }else if(field === 'quantidade'){
            values[index].quantidade=value;
        } else if (field === 'uso') {
            values[index].uso = value;
        } 
        setMedicamentos(values);
        console.log(medicamentos)
    }

//remove campo medicamento
    const removerCampos = (index) => {
        const values = [...medicamentos];
        console.log(values)
        values.splice(index, 1);
        setMedicamentos(values); // Atualizar o estado após remover o item
    }

    const adicionaMedicamento = () => {
        setMedicamentos([...medicamentos, { nome: '', quantidade: '',uso: '' }]);
    }

//trata dados do meu select    
    const mudancaSelect = (e) => {
        const valorSelecionado = e.target.value;
    
        if (valorSelecionado === 'novoPaciente') {
            setShowModal(true); 
        } else {
            setPaciente(valorSelecionado);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const registraReceita = async (e) => {
        e.preventDefault();
        
        const dados = {};
        
        if (paciente) {
            dados.paciente = Number(paciente);
        } else {
            return alert("Nome do paciente é obrigatório");
        }

        if (medicamentos.some(med => med.nome.trim() !== '' && med.uso.trim() !== '')) {
            dados.medicamentos = [...medicamentos];
        } else {
            return alert("Adicionar medicamento é obrigatório");
        }

        console.log(dados)

        
        try {
            const {data}= await Axios.post('http://localHost:5008/homepage/prescrever', dados,
                 {
                headers: { "Authorization": JSON.parse(localStorage.getItem('user')).token }
            })
            fetchMedicamentos();
           
        } catch (err) {
            console.error(err.response.data.error);
        }
    };
//trata todos os dados para enviar para api    
    /*const registraReceita = async(e) => {
        e.preventDefault();
        
        const dados = {};
        
        if(e.target.elements.paciente.value){
            dados.paciente = e.target.elements.paciente.value;
        }else{
            return alert("nome do paciente obrigatorio");
        }

        //const temMedicamentoPreenchido = medicamentos.some(med => med.nome.trim() !== '' && med.uso.trim() !== '');

        /*if (temMedicamentoPreenchido) {
            dados.medicamentos = [...medicamentos]
        } else {
            return alert("adicionar medicamento!!! é Obrigatorio");
        }*/
       /* 
        Axios.post('http://localHost:5008/homepage/prescrever',dados,
            {
              headers: { "Authorization": JSON.parse(localStorage.getItem('user')).token }
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err.response.data.error)
            })
        }
        */
    return (
        <>
    
        <div className='receita mt-5'>
            {showModal && <PacienteModal onClose={closeModal} refreshPacientes={fetchPacientes}/>}
            <h4>Receituário</h4>
            <form onSubmit={registraReceita}>
                <select className="form-select" aria-label="Default select example" onChange={mudancaSelect} >
                    <option value="">Selecione um paciente</option>
                    {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>
                            {paciente.nm_pessoa}
                        </option>)
                    )}
                    <option  key="novoPaciente"  value="novoPaciente">+ Adicionar Novo Paciente</option>
                </select>
                <h4>Medicamentos</h4>

                {medicamentos.map((medicamento, index) => (
                    <>
                    <div key={index} className="mb-3 customiza" >
                    <div className="med row">

                        <div className="col-md-8">
                            <label htmlsFor={`medicamento-${index}`} className="form-label">Medicamento</label>
                            <Autocomplete className='testando_estilo' freeSolo id={`autocomplete-medicamento-${index}`}
                                        options={listaMedicamentos.map((med) => med.nome)} value={medicamento.nome}
                                        onChange={(event, newValue) => {
                                            handleInputChange(index, 'medicamento', newValue);
                                        }}
                                        onInputChange={(event, newValue) => {
                                            handleInputChange(index, 'medicamento', newValue);
                                        }}
                                    renderInput={(params) => (
                            <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Digite o nome do medicamento"
                                    InputLabelProps={{ shrink: false }}
                            />
                    )}
                />
                        </div>
                        <div className="col-md-4">
                            <label htmlsFor={`quantidade-${index}`} className="form-label">Quantidade</label>
                            <input type="number" className="form-control" name={`quantidade-${index}`} placeholder="Quantidade" min={1} value={medicamento.quantidade} onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)} />
                        </div>
                    
                    </div>
                        
                        <label htmlsFor={`uso-${index}`} className="form-label">{`Formas de Usar`}</label>
                        <input type="text" className="form-control" name={`usar-${index}`} placeholder='Formas de usar' value={medicamento.uso} onChange={(e) => handleInputChange(index, 'uso', e.target.value)}/>
                    
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <button className='btn btn-outline-success ' type='button' onClick={() => removerCampos(index)}>- Medicamento</button>
                    </div>
                    </>
                ))}

                <div className="med-row">
                    <button className="btn btn-success col-md-6 mt-3 " type='button' onClick={adicionaMedicamento}>+ Medicamento</button>
                    <button className="btn btn-success col-md-6 mt-3 "type='submit'>Finalizar</button>
                </div>
                
                

            </form>

        </div>
        </>
    );
}

export default Prescrever;
/*

import { useState } from 'react';
import Input from '../../Components/TagsHtml/Inputs/Input';
import './Prescrever.css';
import Button from '../../Components/TagsHtml/Buttons/Button';

const Prescrever = () => {
    const [medicamentos, setMedicamentos] = useState([{ nome: '', uso: '' }]);

    const handleInputChange = (index, field, value) => {
        const updatedMedicamentos = [...medicamentos];
        if (field === 'medicamento') {
            updatedMedicamentos[index].nome = value;
        } else if (field === 'uso') {
            updatedMedicamentos[index].uso = value;
        }
        setMedicamentos(updatedMedicamentos);
    };

    const adicionaMedicamento = () => {
        setMedicamentos([...medicamentos, { nome: '', uso: '' }]);
    };

    const removerMedicamento = (index) => {
        const updatedMedicamentos = [...medicamentos];
        updatedMedicamentos.splice(index, 1);
        setMedicamentos(updatedMedicamentos);
    };

    const registraReceita = (event) => {
        event.preventDefault();

        // Verifica se ao menos um medicamento tem os campos preenchidos
        const temMedicamentoPreenchido = medicamentos.some(med => med.nome.trim() !== '' && med.uso.trim() !== '');

        if (temMedicamentoPreenchido) {
            console.log("Receita registrada:", medicamentos);
            // Implementar a lógica para salvar no banco aqui
        } else {
            console.log("Nenhum medicamento preenchido.");
            // Pode exibir uma mensagem para o usuário informando que é necessário preencher ao menos um medicamento
        }
    };

    return (
        <div className='prescreve'>
            <div className="receita">
                <h1>Receituário</h1>
                <form onSubmit={registraReceita} className='input-prescreve'>
                    <Input 
                        name='paciente' 
                        text='Paciente' 
                        type='text' 
                        placeholder='Nome Paciente' 
                        customClass='input-prescreve' // Corrigido para customClass
                    />
                    <h2>Medicamentos</h2>
                    {medicamentos.map((medicamento, index) => (
                        <div key={index} className="medicamento-campos">
                            <Input
                                name={`medicamento-${index}`}
                                text={`Medicamento ${index + 1}`}
                                type='text'
                                placeholder='Medicamento'
                                customClass='input-prescreve' // Corrigido para customClass
                                value={medicamento.nome}
                                capturandoInput={(e) => handleInputChange(index, 'medicamento', e.target.value)}
                            />
                            <Input
                                name={`uso-${index}`}
                                text={`Forma de Usar ${index + 1}`}
                                type='text'
                                placeholder='Modo de uso'
                                customClass='input-prescreve' // Corrigido para customClass
                                value={medicamento.uso}
                                capturandoInput={(e) => handleInputChange(index, 'uso', e.target.value)}
                            />
                            <div className='botao-linha'>
                                <button
                                    className='button-styled'
                                    type='button'
                                    onClick={() => removerMedicamento(index)}
                                >
                                    Remover Medicamento
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='botao-linha'>
                        <button
                            className='button-styled'
                            type='button'
                            onClick={adicionaMedicamento}
                        >
                            Adicionar Medicamento
                        </button>
                    </div>
                    <div className='botao-linha'>
                        <Button type='submit' text='Enviar Receita' />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Prescrever;
*/