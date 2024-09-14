import styles from "../../../src/styles/ModalCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ModalCard = ({ prescricao, onClose, id }) => {
  const {
    paciente_nome,
    data_prescricao,
    medicamentos,
    funcionario_nome,
    status,
  } = prescricao;

  const [isEditing, setIsEditing] = useState(false);
  const [editedPacienteNome, setEditedPacienteNome] = useState(paciente_nome);
  const [editedDataPrescricao, setEditedDataPrescricao] = useState(data_prescricao);
  const [editedMedicamentos, setEditedMedicamentos] = useState(medicamentos);
  const [editedFuncionarioNome, setEditedFuncionarioNome] = useState(funcionario_nome);

  const receitaRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receitaRef.current,
  });

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Alterna entre edição e visualização
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Dados atualizados:", {
      paciente_nome: editedPacienteNome,
      data_prescricao: editedDataPrescricao,
      medicamentos: editedMedicamentos,
      funcionario_nome: editedFuncionarioNome,
    });
    setIsEditing(false); // Volta para o modo de visualização após salvar
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span title="Fechar" onClick={onClose} className={styles.close}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        <div className={styles.receita} ref={receitaRef}>
          {isEditing ? (
              
              
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <div className={styles.border}>
                <div className={styles.receituario}>
                  <h3>EDITAR</h3>
                </div>
                <section className={styles.dPessoais}>
                  <h4><strong>Dados Pessoais</strong></h4>
                  <div>
                          <label htmlFor={'paciente'}>Paciente:</label>
                            
                            <input
                              type="text"
                              name="paciente"
                              value={editedPacienteNome}
                              onChange={(e) => setEditedPacienteNome(e.target.value)}
                              className={styles.inputEdit}
                            />
                          
                  </div>
                </section>
                <section className={styles.prescricao}>
                  <h4><strong>Medicamentos</strong></h4>
                  {editedMedicamentos.map((med, index) => (
                    <div key={index} className={styles.subSection}>
                      <div className={styles.editMedicamentoPrescricao}>
                            
                            <div className={styles.medPrescricaoEdit}>
                            <label htmlFor={"medicamento-"+index} >
                              Medicamento:
                            </label>
                            <input
                                type="text"
                                name={"medicamento-"+index}
                                value={med.nome}
                                onChange={(e) => {
                                  const newMedicamentos = [...editedMedicamentos];
                                  newMedicamentos[index].nome = e.target.value;
                                  setEditedMedicamentos(newMedicamentos);
                                }}
                                className={styles.inputEdit}
                            />
                            </div>
                            <div className={styles.medQtdEdit}>
                            
                            <label>
                              Quantidade:
                            </label>
                            <input
                              type="number"
                              value={med.quantidade}
                              onChange={(e) => {
                                  const newMedicamentos = [...editedMedicamentos];
                                  newMedicamentos[index].quantidade = e.target.value;
                                  setEditedMedicamentos(newMedicamentos);
                              }}
                              className={styles.inputEdit}
                              />
                            </div>
                      </div>
                      
                      
                      
                    </div>
                  ))}
                  
                </section>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.btnSalvar}>Salvar</button>
                
              </div>
            </form>

          ) : (
            <div className={styles.border}>
              <div className={styles.receituario}>
                <h3>RECEITUÁRIO</h3>
              </div>
              <section className={styles.dPessoais}>
                <h4><strong>Dados Pessoais</strong></h4>
                <p>
                  <span><strong>Paciente: </strong></span>
                  <span className={styles.responses}>{paciente_nome}</span><br />
                  <span><strong>Data Nascimento: </strong></span>
                  <span className={styles.responses}>{formatDate(data_prescricao)}</span><br />
                </p>
              </section>
              <section className={styles.prescricao}>
                <h4><strong>Medicamentos</strong></h4>
                {medicamentos.map((med, index) => (
                  <div key={index} className={styles.subSection}>
                    <div className={styles.medQtd}>
                      <span><strong>Medicamento: </strong> <span className={styles.responses}>{med.nome}</span></span>
                      <span><strong>Quantidade: </strong> <span className={styles.responses}>{med.quantidade}</span></span>
                    </div>
                    <span><strong>Formas De Usar: </strong></span> <span className={styles.responses}>{med.forma_uso}</span>
                  </div>
                ))}
                <div className={styles.dataCity}>
                  <span className={styles.responses}>Peabiru, {formatDate(data_prescricao)}</span>
                </div>
                <div className={styles.assinatura}>
                  <span className={styles.nmMedico}>{funcionario_nome}</span><br />
                  <strong>CRM: </strong> <span className={styles.responses}>10093-PR</span>
                </div>
              </section>
            </div>
          )}
        </div>
        {!isEditing && (
          <div className={styles.modalActions}>
            <button className={styles.btnEdit} onClick={handleEditClick}>Alterar Dados</button>
            <button className={styles.btnPrint} onClick={handlePrint}>Imprimir</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCard;




/*import styles from "../../../src/styles/ModalCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ModalCard = ({ prescricao, onClose, id }) => {
  const {
    paciente_nome,
    data_prescricao,
    medicamentos,
    funcionario_nome,
    status,
  } = prescricao;

  const edit =()=>{
    console.log('clicou na: ',id)
  }

  const receitaRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => receitaRef.current, // Apenas o conteúdo da receita será impresso
  });

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
            <span title="Fechar" onClick={onClose} className={styles.close}>
              <FontAwesomeIcon icon={faXmark} />
            </span> 
        <div className={styles.receita} ref={receitaRef}>
          <div className={styles.border}>
            <div className={styles.receituario}>
              <h3>RECEITUÁRIO</h3>
            </div>
            <section className={styles.dPessoais}>
              <h4><strong>Dados Pessoais</strong></h4>
              <p>
                <span><strong>Paciente: </strong></span> 
                <span className={styles.responses}>{paciente_nome}</span><br/>
                <span><strong>Data Nascimento: </strong></span> 
                <span className={styles.responses}>27/04/1989{" "}</span><br/>
                <span><strong>Convênio: </strong></span> 
                <span className={styles.responses}>000.000.000-00{" "}</span>
              </p>
            </section>
            <section className={styles.prescricao}>
              <h4><strong>Medicamentos</strong></h4>
              {medicamentos.map((med, index) => (
                <div key={index} className={styles.subSection}>
                  <div className={styles.medQtd}>
                    <span><strong>Medicamento: </strong> <span className={styles.responses}>{med.nome}</span></span>
                    <span><strong>Quantidade: </strong> <span className={styles.responses}>{med.quantidade}</span></span>
                  </div>
                    <span><strong>Formas De Usar: </strong></span> <span className={styles.responses}>{med.forma_uso}</span> 
                </div>
              ))}

              <div className={styles.data}>
                <p className={styles.dataCity}>
                  <span className={styles.responses}>Peabiru, {formatDate(data_prescricao)}</span>
                </p>
                <br />
              </div>

              <div className={styles.assinatura}>
                <span className={styles.nmMedico}>{funcionario_nome}</span> <br />
                <strong>CRM: </strong> <span className={styles.responses}>10093-PR</span>
               
              </div>
            </section>
          </div>
            
        </div>
        <div className={styles.modalActions}>

              
              <button className={styles.btnEdit} onClick={edit}>
                Alterar Dados
              </button>
              <button className={styles.btnPrint} onClick={handlePrint}>
                Imprimir 
              </button>
            </div>
        
      </div>
    </div>
  );
};

export default ModalCard;
*/