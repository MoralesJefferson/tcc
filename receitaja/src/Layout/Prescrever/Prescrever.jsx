import { useContext, useState } from 'react';
import Form from '../../Components/TagsHtml/Forms/Form';
import Input from '../../Components/TagsHtml/Inputs/Input';
import './Prescrever.css';
import Button from '../../Components/TagsHtml/Buttons/Button';
import Axios from 'axios';


const Prescrever = () => {
    const [medicamentos, setMedicamentos] = useState([{ nome: '', uso: '' }]);

    const handleInputChange = (index, field, value) => {
        const values = [...medicamentos];
        if (field === 'medicamento') {
            values[index].nome = value;
        } else if (field === 'usar') {
            values[index].uso = value;
        }
        setMedicamentos(values);

    }

    const removerCampos = (index) => {
        const values = [...medicamentos];
        values.splice(index, 1);
        setMedicamentos(values); // Atualizar o estado após remover o item
    }

    const adicionaMedicamento = () => {
        setMedicamentos([...medicamentos, { nome: '', uso: '' }]);
    }
    
    const registraReceita = async(e) => {
        e.preventDefault();
        
        const dados = {};
        
        if(e.target.elements.paciente.value){
            dados.paciente = e.target.elements.paciente.value;
        }else{
            return alert("nome do paciente obrigatorio");
        }

        const temMedicamentoPreenchido = medicamentos.some(med => med.nome.trim() !== '' && med.uso.trim() !== '');

        if (temMedicamentoPreenchido) {
            dados.medicamentos = [...medicamentos]
        } else {
            return alert("adicionar medicamento!!! é Obrigatorio");
        }
        
        Axios.post('http://localHost:5008/homepage/prescrever',dados,
            {
              headers: { "Authorization": JSON.parse(localStorage.getItem('user')).token }
            }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err.response.data.error)
            })
    }
    return (
        <div className='receita'>
            <h1>Receituário</h1>
            <Form onSubmit={registraReceita} custonClass='input-prescreve'>
                <Input name='paciente' text='Paciente' type='text' placeholder='Nome do Paciente' custonClass='input-prescreve'/>
                
                <h1>Medicamentos</h1>
                {medicamentos.map((medicamento, index) => (
                    <div key={index} className="medicamento-campos">
                        <Input
                            name={`medicamento-${index}`}
                            text={`Medicamento ${index + 1}`}
                            type='text'
                            placeholder='Medicamento'
                            custonClass='input-prescreve'
                            capturandoInput={(e) => handleInputChange(index, 'medicamento', e.target.value)}
                        />
                        <Input
                            name={`usar-${index}`}
                            text={`Formas de Usar ${index + 1}`}
                            type='text'
                            placeholder='Formas de usar'
                            custonClass='input-prescreve'
                            capturandoInput={(e) => handleInputChange(index, 'usar', e.target.value)}
                        />
                        <div className='botao-linha'>
                            <button
                                className='button-styled'
                                type='button'
                                onClick={() => removerCampos(index)}
                            >
                                - Medicamento
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
                        + Medicamento
                    </button>
                </div>
                <Button type='submit' text='enviar'/>
            </Form>
        </div>
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