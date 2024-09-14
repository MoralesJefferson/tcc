import { Autocomplete, TextField } from "@mui/material";
import styles from "../../src/styles/AutoCompleteMat.module.css"
const AutoCompleteMat = ({options}) => {
    return (
        <div className={styles.complete}>
  <Autocomplete
    sx={{
      width: "100%",
      borderRadius: "10px",
      "& .MuiOutlinedInput-root": {
        height: "45px",
        padding: "10px 20px",
        borderRadius: "10px",
        border: "solid 2px solid 2px rgba(15, 51, 4, 0.123)",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "solid 2px rgba(15, 51, 4, 0.123)", // Cor da borda ao passar o mouse
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "solid 2px rgba(15, 51, 4, 0.247)", // Cor da borda ao focar
        },
        "&.Mui-focused": {
          borderColor: "solid 2px rgba(15, 51, 4, 0.247)", // Cor da borda ao focar
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none", // Remove a borda do fieldset se necessário
        },
      },
      "& .MuiAutocomplete-input": {
        padding: "10px 20px",
        fontSize: "16px",
        "&::placeholder": {
          color: "black", // Define a cor do placeholder como preto
          opacity: 1, // Garante que a cor do placeholder seja completamente opaca
        },
      },
    }}
    options={options}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Informe o Medicamento"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "45px",
            borderRadius: "10px",
            border: "solid 2px rgba(15, 51, 4, 0.123)",
            "&.Mui-focused": {
              borderColor: "rgba(15, 58, 2, 0.541)", // Cor da borda ao focar
            },
          },
          "& .MuiAutocomplete-input": {
            padding: "10px 20px",
            fontSize: "16px",
            "&::placeholder": {
              color: "rgb(10, 10, 10)", // Define a cor do placeholder como preto
               // Garante que a cor do placeholder seja completamente opaca
            },
          },
        }}
      />
    )}
    onChange={(event, newValue) => {
      console.log(newValue);
    }}
  />
</div>
    );
}

export default AutoCompleteMat;