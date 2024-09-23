import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from'../../../src/styles/EditaPaciente.module.css';
import Axios from "axios";
import { useEffect, useState } from "react";

const EditaPaciente = ({onClose,paciente,refreshPaciente}) => {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState();
    const [carteiraSus, setCarteiraSus] = useState('');
    

    const handleSubmit = async (event) => {
        event.preventDefault();  
        //validar cpf
        try {
            const response = await Axios.put(`http://localhost:5008/paciente/editar/${paciente.id}`, {
                nome,
                cpf:cpf?cpf:'',
                dt_nascimento: dataNascimento?dataNascimento:'',
                cartao_sus: carteiraSus?carteiraSus:'' 
            });
            console.log('Edição realizada com sucesso:', response.data);
            refreshPaciente();
            onClose();
        } catch (error) {
            console.error('Erro ao editar paciente:', error);
        }
    }
    useEffect(() => {
        if (paciente) {
            setNome(paciente.nm_pessoa);
            setCpf(paciente.cpf);
            setDataNascimento(paciente.dt_nascimento);
            setCarteiraSus(paciente.cartao_sus);
        }
    }, [paciente]);

    return (
        <div className={styles.boxRegistra}>
        <div className={styles.modalContent}>
        <span title="Fechar" onClick={onClose} className={styles.close}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        
            <form onSubmit={handleSubmit} className={styles.receita}>
            <h4 className={styles.titulo}>Editar</h4>
                <div className={styles.form}>
                    <label htmlFor="nome" className={styles.formLabel} >Nome</label>
                    <input className={styles.formControl} type="text"  value={nome} onChange={(e) => setNome(e.target.value)} required/>
                </div>

                <div className={styles.form}>
                    <label htmlFor="cpf" className={styles.formLabel}  >CPF</label>
                    <input className={styles.formControl} type="text"  id="cpf" value={cpf} maxLength={11}  onChange={(e) => setCpf(e.target.value)}/>
                </div>

                <div className={styles.form}>
                    <label htmlFor="dataNascimento" className={styles.formLabel} >Data de Nascimento</label>
                    <input className={styles.formControl} type="date"  id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                </div>

                <div className={styles.form}>
                    <label htmlFor="carteiraSus" className={styles.formLabel} >Carteira SUS</label>
                    <input className={styles.formControl} type="text"  id="carteiraSus" value={carteiraSus} onChange={(e) => setCarteiraSus(e.target.value)}/>
                </div>

                <div className={styles.boxBtn} >
                    <button className={styles.btn} type="submit"  >Salvar</button>
                </div>

            </form>
        </div>
    </div>
    );
}

export default EditaPaciente;