import styles from "../../../src/styles/ModalCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Autocomplete, TextField } from "@mui/material";
import { adicionaMedicamento, fetchMedicamentos, handleInputChange, removerCampos } from "../../../controllers/prescricao/prescricao";
import Axios from "axios";
import { useUser } from "../../../context/UserContext";

const ModalCard = ({ prescricao, onClose, fetchPrescricao}) => {
  const {setTipoUser, tipoUser } = useUser()
  
 const {
    paciente_nome,
    data_prescricao,
    dt_nascimento,
    //medicamentos,
    funcionario_nome,
    status,
    prescricao_id,
  } = prescricao;
  const bottomFormRef = useRef(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [medicamentos, setMedicamentos] = useState(prescricao.medicamentos)
  const [listaMedicamentos, setListaMedicamentos] = useState([{ nome: "" }]);
  const receitaRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => receitaRef.current,
  });
  const formatDateNascimento =(dataString) => {
    const data = new Date(dataString).toISOString().split('T')[0]
    const [ano, mes, dia] = data.split('-');
    const dataFormatada = `${dia}-${mes}-${ano}`;
    return dataFormatada
  }  
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); 
  };

  const enviaFormEdicao = async(e) => {
    e.preventDefault();
    const dados = {};
    if (medicamentos.some((med) => med.nome.trim() !== "" && med.forma_uso.trim() !== "")) {
      dados.medicamentos = [...medicamentos];
    } else {
      return alert("Adicionar medicamento e sua forma de uso é obrigatório");
    }

    try {
      const { data } = await Axios.post(`http://localHost:5008/prescricao/editar/${prescricao_id}`,dados);
      fetchPrescricao()
      setIsEditing(false);
      /*
            const {data}= await Axios.post('http://localHost:5008/homepage/prescrever', dados,
                 {
                //headers: { "Authorization": JSON.parse(localStorage.getItem('user')).token }
            })*/
      /*closePrescricao();     
      fetchMedicamentos(setListaMedicamentos);*/
    } catch (err) {
      console.error(err);
    }
  };
  const baixarPrescricao = async()=>{
    try {
      const { data } = await Axios.post(`http://localHost:5008/prescricao/baixar/${prescricao_id}`);
      fetchPrescricao()
      onClose()
    } catch (error) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchMedicamentos(setListaMedicamentos);
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span title="Fechar" onClick={onClose} className={styles.close}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        <div className={styles.receita} ref={receitaRef}>
          {isEditing ? (
              <div className={styles.border}>
                  <div className={styles.receituario}>
                    <h3>Editar</h3>
                  </div>
                  <section className={styles.dPessoais}>
                    <h4><strong>Dados Pessoais</strong></h4>
                    <p>
                      <span><strong>Paciente: </strong></span>
                      <span className={styles.responses}>{paciente_nome}</span><br />
                      <span><strong>Data Nascimento: </strong></span>
                      <span className={styles.responses}>{formatDateNascimento(dt_nascimento)}</span><br />
                    </p>
                  </section>
                  <section className={styles.prescricao}>
                    <form onSubmit={enviaFormEdicao}>
                        <h4><strong>Medicamentos</strong></h4>
                        <div>
                            {
                                medicamentos.map((medicamento, index) => (
                                  <div key={index}>
                                      <div className={styles.medQtd}>
                                          <div className={styles.medicamento}>
                                              <label htmlFor={`medicamento-${index}`} className={styles.formLabel}>Medicamento</label>
                                              <Autocomplete
                                                  sx={{
                              
                                                    '& .MuiInputBase-root':{
                                                        backgroundColor:'#ffffff',
                                                        borderRadius:'5px 5px 5px 5px',
                                                    
                                                    },
                                                    '& .MuiOutlinedInput-root':{
                                                        padding:'0px',
                                                        '& .MuiAutocomplete-input':{
                                                            padding:'5px 10px 5px 5px',
                                                        }
                                                    }
                                                  }}
                                                  freeSolo
                                                  id={`autocomplete-medicamento-${index}`}
                                                  options={listaMedicamentos.map((med) => med.nome)}
                                                  value={medicamento.nome}
                                                  onChange={(event, newValue) => {
                                                    handleInputChange(medicamentos, setMedicamentos, index, "medicamento", newValue);
                                                  }}
                                                  onInputChange={(event, newValue) => {
                                                    handleInputChange(medicamentos, setMedicamentos,index, "medicamento", newValue);
                                                  }}
                                                  renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder="Digite o nome do medicamento"
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                fontSize:'12px',
                                                                '& fieldset':{
                                                                    borderColor:'green',
                                                                    background:'#3da88525',
                                                                },
                                                                '&:hover fieldset':{
                                                                    borderColor:'#034632'
                                                                },
                                                                "&.Mui-focused fieldset": {
                                                                    borderColor: "#034632", // Cor da borda quando focado
                                                                }, 
                                                            }
                                                        }}
                                                    />  
                                                  )}
                                              />
                                          </div>
                                          <div className={styles.qtd}>
                                             <label htmlsFor={`quantidade-${index}`} className={styles.formLabel}>Quantidade</label>
                                                <input
                                                    type="number"
                                                    className={styles.formControl}
                                                    name={`quantidade-${index}`}
                                                    placeholder="Quantidade"
                                                    min={1}
                                                    value={medicamento.quantidade}
                                                    onChange={(e) =>
                                                      handleInputChange(medicamentos, setMedicamentos,index, "quantidade", e.target.value)
                                                    }
                                                />
                                          </div>
                                      </div>
                                      <div className={styles.formUsar}>
                                          <label htmlsFor={`uso-${index}`} className={styles.formLabel}>{`Formas de Usar`}</label>
                                          <input
                                              type="text"
                                              className={styles.formControl}
                                              name={`usar-${index}`}
                                              placeholder="Formas de usar"
                                              value={medicamento.forma_uso}
                                              onChange={(e) =>
                                                handleInputChange(medicamentos, setMedicamentos,index, "forma_uso", e.target.value)
                                              }
                                          />
                                      </div> 
                                      <div className={styles.btnCentro}>
                                          <button className={styles.btnRemove} type="button" onClick={() => removerCampos(medicamentos, setMedicamentos, index)}>
                                              <FontAwesomeIcon icon={faXmark} style={{color: "#f40101",border:"none"}} />
                                          </button>
                                      </div>        
                                  </div>
                                ))
                              }
                        </div>
                        <div className={`med-row`}>
                          <button className={"btn btn-success col-md-6 mt-3"} type="button" onClick={()=>adicionaMedicamento(medicamentos, setMedicamentos, bottomFormRef)}>
                              + Medicamento
                          </button>
                          <button className={"btn btn-success col-md-6 mt-3"} type="submit">
                              Salvar
                          </button>
                        </div>            
                    </form>
                  </section>
                  

              </div>
              
          ) : (
            
            <div className={styles.border}>
              <div className={styles.receituario}>
                <h3>RECEITUÁRIO-{prescricao_id}</h3>
              </div>
              <section className={styles.dPessoais}>
                <h4><strong>Dados Pessoais</strong></h4>
                <p>
                  <span><strong>Paciente: </strong></span>
                  <span className={styles.responses}>{paciente_nome}</span><br />
                  <span><strong>Data Nascimento: </strong></span>
                  <span className={styles.responses}>{formatDateNascimento(dt_nascimento)}</span><br />
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
            {tipoUser === 'Medico'?
                    <button className={styles.btnEdit} onClick={handleEditClick}>Alterar Dados</button>
                : status ==='Entregue'?
                    <></>
                :
                  <>
                    <button className={styles.btnEdit} onClick={baixarPrescricao}>Baixar-Prescricao</button>
                  </>
            }
            <button className={styles.btnPrint} onClick={handlePrint}>Imprimir</button>
          </div>
        )}
        <div ref={bottomFormRef}></div>
      </div>
    </div>
  );
};

export default ModalCard;

