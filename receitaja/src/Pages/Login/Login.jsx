import './Login.css'
import { Link } from 'react-router-dom'

import Button from "../../Components/TagsHtml/Buttons/Button";
import Form from "../../Components/TagsHtml/Forms/Form";
import Input from "../../Components/TagsHtml/Inputs/Input";

const Login = () => {
    const tratandoFormulario =(e)=>{
        e.preventDefault()
        console.log(e.target.elements.email.value)
    }
    return (
       <div className="Box-login">

            <Form onSubmit={tratandoFormulario} text='login'>
                <Input name='email' text='E-mail' type='email'placeholder='informe um e-mail valido'/>
                <Input name='password' text='Password' type='password'placeholder='informe sua senha'/>
                
                <div className="esqueceuSenha">
                    <Input name='lembreDeMim' text='Lembre-se de mim' type='checkbox' custonClass='checkbox'/>
                    <Link to='/esquecisenha'> esqueceu a senha?</Link>
                </div>
                <Button type='submit' text='enviar'/>
                    <p>Ainda não possui uma conta? <Link to='/cadastro'>Cadastre-se</Link></p>
                
            </Form>
       </div>
    );
}

export default Login;