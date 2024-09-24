import Container from "../../../components/layout/container/Container";
import { useEffect, useState } from "react";
import Axios from "axios";
import styles from "../../styles/HistoryPrescricao.module.css";
import ModalCard from "../../../components/layout/modal/ModalCard";
const historyPrescricao = () => {
    const [prescricoes, setPrescricoes] = useState([]);
    const [showModalCard, setShowModalCard] = useState(false);
    const [prescricao, setPrescricao] = useState();
    
    const verPrescricao=(prescricao)=>{
        setPrescricao(prescricao)
        setShowModalCard(true)
    }
    const closeVerPrescricao=( )=>{
        setShowModalCard(false)
    }

    const fetchPrescricao = () => {
        Axios.get("http://localhost:5008/homepage/lista/prescricao")
          .then((response) => {
            console.log(response.data);
            setPrescricoes(response.data);
            console.log(prescricoes)
          })
          .catch((error) => {
            console.error("Erro ao buscar prescrições:", error);
          });
    };

    const removePrescricao = async (prescricao_id) => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta prescrição?");
        
        if (confirmDelete) {
            try {
                const response = await Axios.post(`http://localhost:5008/prescricao/delete/${prescricao_id}`);
                console.log(response.data);
                fetchPrescricao()
            } catch (error) {
                console.error("Erro ao deletar prescrição:", error);
            }
        } else {
            console.log("Exclusão da prescrição cancelada.");
        }
    };
    

    useEffect(()=>{
        fetchPrescricao()
    },[])

    return (
        <Container>
            <div className={styles.lista}>
            <div className={styles.cxTabela}>
            <table className={styles.tabela}>
                <thead className={styles.cabeca}>
                    <tr className={styles.cabecalho}>
                        <th className={styles.id}>Código</th>
                        <th className={styles.nomeTh}>Nome Paciente</th>
                        <th className={styles.cpf}>Nome Médico</th>
                        <th className={styles.data}>Status</th>
                        <th className={styles.funcaoTh}></th>
                    </tr>
                </thead>
                <tbody>
                    {prescricoes.map((prescr) => (
                        
                        <tr key={prescr.prescricao_id} className={styles.row}>
                            
                            <td className={styles.id}>{prescr.prescricao_id}</td>
                            <td className={styles.nome}>{prescr.paciente_nome}</td>
                            <td className={styles.cpf}>{prescr.funcionario_nome}</td>
                            <td className={styles.data}>{prescr.status}</td>
                            <td className={styles.funcao}>
                                
                                <button className={styles.editar} onClick={()=>verPrescricao(prescr)} title="ver prescrição completa">ver</button> 
                                
                                <button className={styles.deletar} onClick={()=>removePrescricao(prescr.prescricao_id)} title="Deletar Paciente">Deletar</button>
                            </td>
                        </tr>
                          
                    ))}
                </tbody>
            </table>
            {showModalCard && (
                    <ModalCard prescricao={prescricao} onClose={closeVerPrescricao}  fetchPrescricao={fetchPrescricao}/>
            )}
            {/*editaModal && (
                    <EditaPaciente onClose={closeEditaPaciente} paciente={pacienteAtual} refreshPaciente={fetchPacientes}/>
            )*/}
            
            </div>
            </div>
        </Container>
    );
}

export default historyPrescricao;