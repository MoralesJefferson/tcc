/*import PaginaDesconectada from "../../components/layout/layoutPaginaDesconectada/PaginaDesconectada";



import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Sobre = () => {
  const options = [
    { label: "Apple", id: 1 },
    { label: "Banana", id: 2 },
    { label: "Orange", id: 3 },
    { label: "Mango", id: 4 },
    { label: "Grapes", id: 5 },
  ];

  return (
    <PaginaDesconectada>
      <div className={styles.complete}>
        <Autocomplete
         sx={{
            background:'',
            borderRadius:'10px',
            border:'2px solid rgba(255, 255, 255, 0.2)'
            ,border:'none'
         }}
          /*classes={{
            root: styles.autocompleteRoot,
            inputRoot: styles.autocompleteInputRoot,
            input: styles.autocompleteInput,
          }}*/ /*
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
           
            <TextField
          {...params}
          placeholder="Digite algo"
          sx={{
            width:300,
           
            
            '& .MuiOutlinedInput-root': {
              height: '45px', // Ajuste a altura conforme necessário
              padding: '10px 20px', // Ajusta o padding interno
              borderRadius:'10px',
              border:'none'
            },
            '& .MuiAutocomplete-input': {
              padding: '10px 20px', // Ajusta o padding do input
              fontSize: '16px',
              border:'none'
              
            },
          }}
        />
            /* <TextField
              {...params}
              label="Select a fruit"
              InputLabelProps={{ shrink: false }}
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
    // Estilo para o label
    
                 transform: 'none', // Remove a flutuação
                    position: 'absolute',
                     top: '12px', // Ajuste a posição conforme necessário
                        left: '12px',
  },
  '& .MuiInputBase-root': {
    marginTop: '24px', // Ajusta o espaçamento para compensar o label fixo
  }
            
              }}
                />*/
/*          )}
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
        />
       
      </div>
    </PaginaDesconectada>
  );
};

export default Sobre;
*/

import { useState } from "react";
import AutoCompleteMat from "../../components/input/AutoCompleteMat";
import PaginaDesconectada from "../../components/layout/layoutPaginaDesconectada/PaginaDesconectada";
import styles from "../styles/Sobre.module.css";

const Sobre = () => {
  const options = [
    { label: "Apple", id: 1 },
    { label: "Banana", id: 2 },
    { label: "Orange", id: 3 },
    { label: "Mango", id: 4 },
    { label: "Grapes", id: 5 },
  ];
  const [medicamentos, setMedicamentos] = useState([
    { nome: "", quantidade: "", uso: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [listaMedicamentos, setListaMedicamentos] = useState([{ nome: "" }]);
  const mudancaSelect = () => {
    //trata dados select paciente
  };
  const registraReceita = () => {
    //registra receita
  };

  return (
    <PaginaDesconectada>
      <div className={styles.boxRegistra}>
        <div className={styles.box}>
          <h4 className={styles.titulo}>Receituário</h4>

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
            <h4 className={styles.titulo} >Medicamentos</h4>
            <div className={styles.subBox}>
                <div className={styles.med}>
                <AutoCompleteMat options={options} />
                </div>
                <div className={styles.qtd}>
                    <input className={styles.qtdInput} placeholder={'quantidade'} type="text" />
                </div>
            </div>
            <input type="text" className={styles.formUsar} placeholder="formas de utilizar" />
            <div
                className={"d-flex justify-content-center align-items-center"}
              >
                <button
                  className={`${styles.btn} btn btn-outline-success`}
                  type="button"
                  onClick={() => removerCampos(index)}
                >
                  - Medicamento
                </button>
              </div>
              <div className={styles.subBox}>
                <div className={styles.med}>
                <AutoCompleteMat options={options} />
                </div>
                <div className={styles.qtd}>
                    <input className={styles.qtdInput} placeholder={'quantidade'} type="text" />
                </div>
            </div>
            <input type="text" className={styles.formUsar} placeholder="formas de utilizar" />
            <div
                className={"d-flex justify-content-center align-items-center"}
              >
                <button
                  className={`${styles.btn} btn btn-outline-success`}
                  type="button"
                  onClick={() => removerCampos(index)}
                >
                  - Medicamento
                </button>
              </div>
          </form>
        </div>
      </div>
    </PaginaDesconectada>
  );
};

export default Sobre;
