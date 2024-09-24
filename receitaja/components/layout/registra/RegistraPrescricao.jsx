import { useRef } from "react";
import Axios from "axios";
import styles from "../../../src/styles/RegistraPrescricao.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faXmark } from "@fortawesome/free-solid-svg-icons";
import RegistraPaciente from "./RegistraPaciente";
import { fetchMedicamentos, handleInputChange, removerCampos, adicionaMedicamento, tratarPrescricao } from '../../../controllers/prescricao/prescricao';
const RegistraPrescricao = ({closePrescricao}) => {

  const [medicamentos, setMedicamentos] = useState([{ nome: "", quantidade: "", forma_uso: "" },]);
  const [showModal, setShowModal] = useState(false);
  const [paciente, setPaciente] = useState('');
  const [listaPaciente, setListaPaciente] = useState([]);
  const [listaMedicamentos, setListaMedicamentos] = useState([{ nome: "" }]);
  
  const bottomFormRef = useRef(null);

  const mudancaSelect = (e) => {
    const valorSelecionado = e.target.value;

    if (valorSelecionado === "novoPaciente") {
      setShowModal(true);
    } else {
      setPaciente(valorSelecionado);
    }
  };

  const fetchPacientes = () => {
    Axios.get("http://localhost:5008/paciente/lista/", {})
      .then((response) => {
        setListaPaciente(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar pacientes:", error);
      });
  };

  const closeRegistraPaciente = () => {
    setShowModal(false);
  };

  const registraReceita = async (e) => {
    e.preventDefault();
    
    const dados = tratarPrescricao(paciente,medicamentos);
    if(dados.error)return alert(dados.error);
    try {
      const { data } = await Axios.post(
        "http://localHost:5008/homepage/prescrever",
        dados
      );
      /*
            const {data}= await Axios.post('http://localHost:5008/homepage/prescrever', dados,
                 {
                //headers: { "Authorization": JSON.parse(localStorage.getItem('user')).token }
            })*/
      closePrescricao();     
      fetchMedicamentos(setListaMedicamentos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMedicamentos(setListaMedicamentos);
    fetchPacientes();
  }, []);

  return (
    <div className={styles.boxRegistra}>
      <div className={styles.modalContent}>
        <span title="Fechar" onClick={closePrescricao} className={styles.close}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
      <div className={styles.receita}>
        {showModal && (
          <RegistraPaciente
            onClose={closeRegistraPaciente}
            refreshPaciente={fetchPacientes}
          />
        )}
        <h4 className={styles.titulo}>Prescrever</h4>
        <form onSubmit={registraReceita}>
          <select
            className={styles.formSelect}
            aria-label="Default select example"
            onChange={mudancaSelect}
          >
            <option value="">Selecione um paciente</option>
            {listaPaciente.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nm_pessoa}
              </option>
            ))}
            <option key="novoPaciente" value="novoPaciente">
              + Adicionar Novo Paciente
            </option>
          </select>
          
          <h4 className={styles.subTitulo}>Medicamentos</h4>
            <div>

            
                {medicamentos.map((medicamento, index) => (
                  <>
                    <div key={index}>
                    <div className={styles.medQtd}>
                        <div className={styles.medicamento}>
                              <label
                                htmlFor={`medicamento-${index}`}
                                className={styles.formLabel}
                              >Medicamento</label>
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
                          <label
                            htmlsFor={`quantidade-${index}`}
                            className={styles.formLabel}
                          >
                            Quantidade
                          </label>
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
                          <label
                            htmlsFor={`uso-${index}`}
                            className={styles.formLabel}
                          >{`Formas de Usar`}</label>
                          <input
                            type="text"
                            className={styles.formControl}
                            name={`usar-${index}`}
                            placeholder="Formas de usar"
                            value={medicamento.uso}
                            onChange={(e) =>
                              handleInputChange(medicamentos, setMedicamentos,index, "forma_uso", e.target.value)
                            }
                          />
                       </div>   
                    </div>

                    <div className={styles.btnCentro}>
                      <button
                        className={styles.btnRemove}
                        type="button"
                        onClick={() => removerCampos(medicamentos, setMedicamentos, index)}
                      >
                        <FontAwesomeIcon icon={faXmark} style={{color: "#f40101",border:"none"}} />
                      </button>
                    </div>
                  </>
                ))}
          </div>
          <div className={`med-row`}>
            <button
              className={"btn btn-success col-md-6 mt-3"}
              type="button"
              onClick={()=>adicionaMedicamento(medicamentos, setMedicamentos, bottomFormRef)}
            >
              + Medicamento
            </button>
            <button className={"btn btn-success col-md-6 mt-3"} type="submit">
              Finalizar
            </button>
          </div>
        </form>
      </div>
      <div ref={bottomFormRef}></div>
      </div>
    </div>
  );
};

export default RegistraPrescricao;
