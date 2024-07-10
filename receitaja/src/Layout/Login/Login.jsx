import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

import Button from "../../Components/TagsHtml/Buttons/Button";
import Form from "../../Components/TagsHtml/Forms/Form";
import Input from "../../Components/TagsHtml/Inputs/Input";
import { setTokenUser } from '../../Auth/Auth';
import Axios  from 'axios';

const Login = () => {
    const navigate = useNavigate()
    const logando  = async (e) => {
    e.preventDefault()
    const dados = {};
    if(e.target.elements.email.value){
        dados.email = e.target.elements.email.value;
    }else{
        return alert("email obrigatorio");
    }
    if(e.target.elements.password.value){
        dados.senha = e.target.elements.password.value; 
    }else{
        return alert("senha obrigatorio");
    } 
    try {
        const {data} = await Axios.post('http://localhost:5008/funcionario/login',dados) 
        setTokenUser(data, navigate)

    } catch (error) {
            console.log(error.response.data)
    }   
    }
    
    return (
       <div className="Box-login">

            <Form onSubmit={logando} text='login'>
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