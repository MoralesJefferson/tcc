import Axios from "axios";
import styles from "../../../src/styles/RegistraPrescricao.module.css";
import ModalPaciente from "../modal/ModalPaciente";
import { useState } from "react";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
const RegistraPrescricao = () => {
  const [medicamentos, setMedicamentos] = useState([
    { nome: "", quantidade: "", uso: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [listaMedicamentos, setListaMedicamentos] = useState([{ nome: "" }]);
  const mudancaSelect = (e) => {
    const valorSelecionado = e.target.value;

    if (valorSelecionado === "novoPaciente") {
      setShowModal(true);
    } else {
      setPaciente(valorSelecionado);
    }
  };
  const removerCampos = (index) => {
    const values = [...medicamentos];
    console.log(values);
    values.splice(index, 1);
    setMedicamentos(values); // Atualizar o estado após remover o item
  };
  const adicionaMedicamento = () => {
    setMedicamentos([...medicamentos, { nome: "", quantidade: "", uso: "" }]);
  };
  const fetchPacientes = () => {
    Axios.get("http://localhost:5008/paciente/lista/", {})
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar pacientes:", error);
      });
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

  const closePacienteModal = () => {
    setShowModal(false);
  };

  const registraReceita = async (e) => {
    e.preventDefault();

    const dados = {};

    if (paciente) {
      dados.paciente = Number(paciente);
    } else {
      return alert("Nome do paciente é obrigatório");
    }

    if (
      medicamentos.some(
        (med) => med.nome.trim() !== "" && med.uso.trim() !== ""
      )
    ) {
      dados.medicamentos = [...medicamentos];
    } else {
      return alert("Adicionar medicamento é obrigatório");
    }

    console.log(dados);

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
      fetchMedicamentos();
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
    fetchPacientes();
  }, []);

  return (
    <div className={styles.boxRegistra}>
      <div className={styles.modalContent}>
      <div className={styles.receita}>
        {showModal && (
          <ModalPaciente
            onClose={closeModal}
            refreshPacientes={fetchPacientes}
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
            {pacientes.map((paciente) => (
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
                    <div key={index} /*className={`mb-3 customiza`}*/>
                      <div /*className={`med row`}*/>
                        <div /*className={"col-md-8"}*/>
                          <label
                            htmlFor={`medicamento-${index}`}
                            /*className={styles.formLabel}*/
                          >
                            Medicamento
                          </label>
                          <Autocomplete
                            className={styles.testandoEstilo}
                            sx={{
                              bgcolor: 'red',
                              boxShadow: 0,
                              borderRadius: 1,
                              p:0,
                              minWidth: 300,
                              height:'25px'
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
                                InputLabelProps={{ shrink: false }}
                                //className={styles.testandoEstilo}
                                sx={{
                                  bgcolor: 'red',
                                  boxShadow: 0,
                                  borderRadius: 1,
                                  p:0,
                                  minWidth: 300,
                                  height:'25px'
                                }}

                                  
                              />
                            )}
                          />
                        </div>
                        <div /*className={`col-md-4`}*/>
                          <label
                            htmlsFor={`quantidade-${index}`}
                            className={styles.formLabel}
                          >
                            Quantidade
                          </label>
                          <input
                            type="number"
                            /*className={styles.formControl}*/
                            name={`quantidade-${index}`}
                            placeholder="Quantidade"
                            min={1}
                            value={medicamento.quantidade}
                            onChange={(e) =>
                              handleInputChange(index, "quantidade", e.target.value)
                            }
                          />
                        </div>
                      </div>

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
                          handleInputChange(index, "uso", e.target.value)
                        }
                      />
                    </div>

                    <div
                      className={"d-flex justify-content-center align-items-center"}
                    >
                      <button
                        className={"btn btn-outline-success"}
                        type="button"
                        onClick={() => removerCampos(index)}
                      >
                        - Medicamento
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
    </div>
  );
};

export default RegistraPrescricao;
