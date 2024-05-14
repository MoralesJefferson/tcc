import Button from "../Buttons/Button";
import Input from "../Inputs/Input";

const Form = () => {
    const capturandoInput = (e) =>{
        e.preventDefault();
        console.log(e.target.elements.email.value)

    }

    return (
        <form  onSubmit={capturandoInput}>
            
            <Input name='email' text='E-mail' type='text'placeholder='informe um e-mail valido' onChange={capturandoInput}  />
            <Button type='submit' text='enviar'/>
        </form>
    );
}

export default Form;