import React, { useState } from 'react';
import styles from'../../../src/styles/RegistraPaciente.module.css';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RegistraPaciente = ({ onClose,refreshPaciente}) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cartao_Sus, setCartao_Sus] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        /*if(cpf === ''){

        } */   
        console.log('xxx',cartao_Sus)
        try {
            const response = await Axios.post('http://localhost:5008/paciente/registro/', {
                nome,
                cpf,
                dt_nascimento: dataNascimento,
                cartao__sus: cartao_Sus
            });
            console.log('Paciente cadastrado com sucesso:', response.data);
            refreshPaciente();
            onClose();
        } catch (error) {
            console.error('Erro ao cadastrar paciente:', error);
        }
    }

    return (
        <div className={styles.boxRegistra}>
        <div className={styles.modalContent}>
        <span title="Fechar" onClick={onClose} className={styles.close}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        
            <form onSubmit={handleSubmit} className={styles.receita}>
            <h4 className={styles.titulo}>Registro de Paciente</h4>
                <div className={styles.form}>
                    <label htmlFor="nome" className={styles.formLabel} >Nome</label>
                    <input className={styles.formControl} type="text"  value={nome} onChange={(e) => setNome(e.target.value)} required/>
                </div>

                <div className={styles.form}>
                    <label htmlFor="cpf" className={styles.formLabel}  >CPF</label>
                    <input className={styles.formControl} type="text"  id="cpf" value={cpf} maxLength={11} onChange={(e) => setCpf(e.target.value)}/>
                </div>

                <div className={styles.form}>
                    <label htmlFor="dataNascimento" className={styles.formLabel} >Data de Nascimento</label>
                    <input className={styles.formControl} type="date"  id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                </div>

                <div className={styles.form}>
                    <label htmlFor="cartao_Sus" className={styles.formLabel} >cartao_ SUS</label>
                    <input className={styles.formControl} type="text"  id="cartao_Sus" value={cartao_Sus} onChange={(e) => setCartao_Sus(e.target.value)}/>
                </div>

                <div className={styles.boxBtn} >
                    <button className={styles.btn} type="submit"  >Cadastrar</button>
                </div>

            </form>
        </div>
    </div>
    );
}

export default RegistraPaciente;





