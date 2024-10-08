// src/components/Card.js
import { useState } from "react";
import styles from "../../../src/styles/Card.module.css";
import ModalCard from "../modal/ModalCard";
import { useUser } from "../../../context/UserContext";

const Card = ({ prescricao ,fetchPrescricao }) => {

  const {setTipoUser, tipoUser } = useUser()

  const { paciente_nome, data_prescricao ,dt_nascimento, medicamentos, funcionario_nome, prescricao_id,cartao_sus,status } = prescricao;
  const [modal, setModal] = useState(false);
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };
  const formatDateNascimento =(dataString) => {
      const data = new Date(dataString).toISOString().split('T')[0]
      const [ano, mes, dia] = data.split('-');
      const dataFormatada = `${dia}-${mes}-${ano}`;
      return dataFormatada
  }  
  const maisDetalhes = () => {
    setModal(true);
  };
  const fechaDetalhes = () => {
    setModal(false);
  };

  return (
    <div className={styles.receita}>
      
      <div className={styles.border}>
      {tipoUser === 'Medico' ? (
  // Render para Médico
  <div className={styles.receituario}>
    <h3>RECEITUÁRIO - {prescricao_id}</h3>
    <h3 className={styles.status} title="Médico"></h3>
  </div>
) : (
  // Render para Farmacêutico ou outro usuário
  <div
    className={styles.receituarioFarma}
  >
    <h3>
      RECEITUÁRIO - {prescricao_id} 
    </h3>
    <h3
      className={`${status === 'Separado' ? styles.amarelo : status === 'Pendente' ? styles.vermelho : status === 'Entregue' ? styles.verde : ''}`}
      title={
        status === 'Separado'
          ? 'Separado'
          : status === 'Pendente'
          ? 'Pendente'
          : status === 'Entregue'
          ? 'Entregue'
          : 'Status desconhecido'
      }
    ></h3>
  </div>
)}
        <section className={styles.dPessoais}>
          <h4>Dados Pessoais</h4>
      
          <p>
            <span><strong>Paciente:</strong></span>
            <span className={styles.responses}>{paciente_nome}</span><br/>
          
            <span><strong>Data Nascimento:</strong></span>
            <span className={styles.responses}>{formatDateNascimento(dt_nascimento)}</span><br /> 

            <span><strong>Convênio:</strong></span>
            <span className={styles.responses}>{cartao_sus}</span>
          </p>
        </section>
        <section className={styles.prescricao}>
          <h4>Medicamentos</h4>
          {medicamentos.map(
            (med, index) =>
              index < 1 && (
                <div key={index} className={styles.subSection}>
                  <div className={styles.medQtd}>
                      
                      <span><strong>Medicamento:</strong> <span className={styles.responses}>{med.nome}</span></span>
                    
                    
                      <span><strong>Quantidade:</strong> <span className={styles.responses}>{med.quantidade}</span></span>
                    
                  </div>
                  
                    
                  
                </div>
              )
          )}
          {medicamentos.length > 1 ? (
            <p className={styles.p}>...</p>
          ) : (
            <div className={styles.espaco}></div>
          )}

          <div className={styles.data}>
            <p className={styles.dataCity }>
              Peabiru, {formatDate(data_prescricao)}
            </p>
            
          </div>

          <div className={styles.assinatura}>
            <span className={styles.nomeMedico}>{funcionario_nome}</span>
            <br />
            <span><strong>CRM:</strong><span className={styles.responses}>10093-PR </span></span>
          <div>
              <button className={styles.btn} onClick={maisDetalhes}>
                detalhes
              </button>
            </div>
          </div>
        </section>
      </div>
      {modal && <ModalCard prescricao={prescricao} id={prescricao_id} onClose={fechaDetalhes}  fetchPrescricao={fetchPrescricao}/>}
    </div>
  );
};

export default Card;
