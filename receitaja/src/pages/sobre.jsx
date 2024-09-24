import { useEffect, useRef, useState } from "react";
import AutoCompleteMat from "../../components/input/AutoCompleteMat";
import PaginaDesconectada from "../../components/layout/layoutPaginaDesconectada/PaginaDesconectada";
import styles from "../styles/Sobre.module.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, TextField } from "@mui/material";
import { text } from "@fortawesome/fontawesome-svg-core";
const Sobre = () => {
  const prescricao = {
    "data_prescricao": "2024-07-09T20:10:11.000Z",
    "dt_nascimento": "1989-01-01T00:00:00.000Z",
    "funcionario_nome": "gislaine",
    "historico_status": [
      {
        "status": "Criada",
        "data_alteracao": "2024-07-09T20:10:11.000Z",
        "funcionario_nome": "gislaine"
      }
    ],
    "medicamentos": [
      {
        "nome": "paracetamol",
        "descricao": null,
        "fabricante": null,
        "quantidade": 4,
        "forma_uso": "2 vezes por dia"
      },
      {
        "nome": "ibuprofeno",
        "descricao": null,
        "fabricante": null,
        "quantidade": 5,
        "forma_uso": "toda hora"
      },
      {
        "nome": "amoxicilina",
        "descricao": null,
        "fabricante": null,
        "quantidade": 4,
        "forma_uso": "todo dia"
      },
      {
        "nome": "torsilax",
        "descricao": null,
        "fabricante": null,
        "quantidade": 8,
        "forma_uso": "só se tiver dor"
      }
    ],
    "paciente_nome": "miguel",
    "prescricao_id": 3,
    "status": "Pendente"
  }
  const [medicamentos, setMedicamentos] = useState(prescricao.medicamentos);
  const [listaMedicamentos, setListaMedicamentos] = useState([{ nome: "" }]);
  const bottomFormRef = useRef(null);
  const removerCampos = (index) => {
    const values = [...medicamentos];
    console.log(values);
    values.splice(index, 1);
    setMedicamentos(values); // Atualizar o estado após remover o item
  };


  const fetchMedicamentos = () => {
    Axios.get("http://localhost:5008/medicamento/lista/", {})
      .then((response) => {
        let remedio = [];
        const resposta = response.data;
        resposta.forEach((element) => {
          remedio.push({ nome: element.nome });
        });

        setListaMedicamentos(remedio);
      })
      .catch((error) => {
        console.error("Erro ao buscar medicamentos:", error);
      });
  };
  useEffect(() => {
    fetchMedicamentos();
    
  }, []);

  const handleInputChange = (index, field, value) => {
    const values = [...medicamentos];
    if (field === 'medicamento') {
        values[index].nome = value;
    }else if(field === 'quantidade'){
        values[index].quantidade=value;
    } else if (field === 'uso') {
        values[index].uso = value;
    } 
    setMedicamentos(values);
    console.log(medicamentos)
  }
  const adicionaMedicamento = () => {
    setMedicamentos([...medicamentos, { nome: "", quantidade: "", uso: "" }]);
    setTimeout(() => {
      if (bottomFormRef.current) {
        bottomFormRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  };

  const registraReceita = async (e) => {
    e.preventDefault();

    const dados = {};

    if (paciente) {
      dados.paciente = prescricao.paciente_nome;
    } else {
      return alert("Nome do paciente é obrigatório");
    }

    if (medicamentos.some((med) => med.nome.trim() !== "" && med.uso.trim() !== "")) {
      dados.medicamentos = [...medicamentos];
    } else {
      return alert("Adicionar medicamento e sua forma de uso é obrigatório");
    }

    try {

      console.log(dados)
      /*const { data } = await Axios.post(
        "http://localHost:5008/homepage/prescrever",
        dados
      );*/
      /*
            const {data}= await Axios.post('http://localHost:5008/homepage/prescrever', dados,
                 {
                //headers: { "Authorization": JSON.parse(localStorage.getItem('user')).token }
            })*/
      //closePrescricao();     
      //fetchMedicamentos();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };
  return (
    <PaginaDesconectada>
      <div className={styles.boxRegistra}>
            <div className={styles.modalContent}>
                <span title="Fechar" onClick={''} className={styles.close}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                <form onSubmit={registraReceita} className={styles.receita}>
                      <div className={styles.receituario}>
                          <h3>RECEITUÁRIO</h3>
                      </div>
                      <section className={styles.dPessoais}>
                          <h4><strong>Dados Pessoais</strong></h4>
                          <p>
                            <span><strong>Paciente: </strong></span>
                            <span className={styles.responses}>{prescricao.paciente_nome}</span><br />
                            <span><strong>Data Nascimento: </strong></span>
                            <span className={styles.responses}>{formatDate(prescricao.dt_nascimento)}</span><br />
                          </p>
                      </section>
                      <h4 className={styles.subTitulo}>Medicamentos</h4>
                      <div>

                      {medicamentos.map((medicamento,index)=>(
                        <>  <div key={index}>
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
                                          handleInputChange(index, "medicamento", newValue);
                                        }}
                                        onInputChange={(event, newValue) => {
                                          handleInputChange(index, "medicamento", newValue);
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
                                <input type="number" className={styles.formControl} name={`quantidade-${index}`} placeholder="Quantidade" min={1} value={medicamento.quantidade}onChange={(e) =>handleInputChange(index, "quantidade", e.target.value)}/>
                              </div>
                                </div>    
                                <label>Formas de Usar:</label>
                                <input type="text" value={medicamento.forma_uso} onChange={(e) =>handleInputChange(index, "uso", e.target.value)} className={styles.inputEdit} />
                            </div>

                            <div
                      className={styles.btnCentro}
                    >
                      <button
                        className={styles.btnRemove}
                        type="button"
                        onClick={() => removerCampos(index)}
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
              onClick={adicionaMedicamento}
            >
              + Medicamento
            </button>
            <button className={"btn btn-success col-md-6 mt-3"} type="submit">
              Finalizar
            </button>
          </div>

                </form>
            </div>
            
      </div>
      
        
    </PaginaDesconectada>
  );
};

export default Sobre;
