import React, { useState } from 'react';
import './PacienteModal.css'; // Arquivo CSS para estilização
import Axios from 'axios';

const PacienteModal = ({ onClose, refreshPacientes }) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState();
    const [carteiraSus, setCarteiraSus] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(cpf === ''){

        }    
        const teste={nome,
                cpf,
                data_nascimento: dataNascimento,
                carteira_sus: carteiraSus
                }
                console.log(teste)
        try {
            const response = await Axios.post('http://localhost:5008/paciente/registro/', {
                nome,
                cpf,
                data_nascimento: dataNascimento,
                carteira_sus: carteiraSus
            });
            console.log('Paciente cadastrado com sucesso:', response.data);
            refreshPacientes();
            // Limpar os campos do formulário
            setNome('');
            setCpf('');
            setDataNascimento('');
            setCarteiraSus('');
            onClose(); // Fechar o modal após o envio dos dados
        } catch (error) {
            console.error('Erro ao cadastrar paciente:', error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="boxModal">
                <span className="close" onClick={onClose}>&times;</span>
                <h4>Cadastro de Paciente</h4>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome (Obrigatório)</label>
                        <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input type="text" className="form-control" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                        <input type="date" className="form-control" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="carteiraSus" className="form-label">Carteira SUS</label>
                        <input type="text" className="form-control" id="carteiraSus" value={carteiraSus} onChange={(e) => setCarteiraSus(e.target.value)}/>
                    </div>

                    <div className='d-flex justify-content-center align-items-center'>
                        <button type="submit" className="btn btn-outline-success ">Cadastrar</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PacienteModal;
