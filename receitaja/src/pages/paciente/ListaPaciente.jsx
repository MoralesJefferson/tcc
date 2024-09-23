import { useEffect, useState } from "react";
import Container from "../../../components/layout/container/Container";
import styles from "../../styles/ListaPaciente.module.css";
import Axios from "axios";
import RegistraPaciente from "../../../components/layout/registra/RegistraPaciente";
import EditaPaciente from "../../../components/layout/registra/EditaPaciente";

const ListaPaciente = () => {
    const [listaPaciente, setListaPaciente]=useState([''])
    const [showModal, setShowModal] = useState(false);
    const [editaModal, setEditaModal] = useState(false);
    const [pacienteAtual, setPacienteAtual] = useState('')
    const fetchPacientes =async()=>{
        const {data} = await Axios.get('http://localhost:5008/paciente/lista')
        console.log(data)
        setListaPaciente(data)
    }
    const showRegistroPaciente = ()=>{
        setShowModal(true)
    }
    const closeRegistroPaciente=()=>{
        setShowModal(false)
    }
    const showEditaPaciente = (paciente)=>{
        const [dia,mes,ano]= paciente.dt_nascimento.split('-')
        paciente.dt_nascimento = `${ano}-${mes}-${dia}`   
        setPacienteAtual(paciente)
        
        setEditaModal(true)
    }
    const closeEditaPaciente=()=>{
        setEditaModal(false)
    }
    const deletarPaciente = async(paciente)=>{
        try {
            const {data} = await Axios.delete(`http://localhost:5008/paciente/remover/${paciente.id}`); 
            console.log('Paciente deletado com Sucesso:', data);
            fetchPacientes();
            
        } catch (error) {
            console.error('Erro ao deletar paciente:', error.response.data);
        }
        console.log(paciente);
    } 
    useEffect(() => {
        fetchPacientes()
    },[]);

    return (
        <Container>
            <div className={styles.lista}>
            <div className={styles.cxTabela}>
            <table className={styles.tabela}>
                <thead className={styles.cabeca}>
                    <tr className={styles.cabecalho}>
                        <th className={styles.id}>Código</th>
                        <th className={styles.nomeTh}>Nome</th>
                        <th className={styles.cpf}>CPF</th>
                        <th className={styles.data}>Data de Nascimento</th>
                        <th className={styles.funcaoTh}><button className={styles.adicionar} onClick={showRegistroPaciente} title="Adicionar Novo Paciente" >Adicionar</button></th>
                    </tr>
                </thead>
                <tbody>
                    {listaPaciente.map((paciente) => (
                        
                        <tr key={paciente.id} className={styles.row}>
                            
                            <td className={styles.id}>{paciente.id}</td>
                            <td className={styles.nome}>{paciente.nm_pessoa}</td>
                            <td className={styles.cpf}>{paciente.cpf?paciente.cpf:'000.000.000-00'}</td>
                            <td className={styles.data}>{paciente.dt_nascimento}</td>
                            <td className={styles.funcao}>
                                
                                <button className={styles.editar} onClick={()=>showEditaPaciente(paciente)} title="Editar Dados Do Paciente">Editar</button> 
                                
                                <button className={styles.deletar} onClick={()=>deletarPaciente(paciente)} title="Deletar Paciente">Deletar</button>
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
            {showModal && (
                    <RegistraPaciente onClose={closeRegistroPaciente} refreshPaciente={fetchPacientes}/>
            )}
            {editaModal && (
                    <EditaPaciente onClose={closeEditaPaciente} paciente={pacienteAtual} refreshPaciente={fetchPacientes}/>
            )}
            
            </div>
            </div>
        </Container>
    );
}

export default ListaPaciente;