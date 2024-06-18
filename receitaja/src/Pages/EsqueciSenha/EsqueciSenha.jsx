import './EsqueciSenha.css'
import Form from '../../Components/TagsHtml/Forms/Form'
import Input from '../../Components/TagsHtml/Inputs/Input'
import Button from '../../Components/TagsHtml/Buttons/Button'
const EsqueciSenha = () => {
    const tratandoFormulario =()=>{

    }
    return (

        <div className="Box-esqueciSenha">

            <Form onSubmit={tratandoFormulario} text='Recuperar Senha'>
                <Input name='email' text='E-mail' type='email'placeholder='informe um e-mail cadastrado'/>
                <Button type='submit' text='enviar'/>
            </Form>
       </div>
    );
}

export default EsqueciSenha;