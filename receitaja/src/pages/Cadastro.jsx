
import Button from "../../components/buttons/Button";
import Input from "../../components/input/Input";
import PaginaDesconectada from "../../components/layout/layoutPaginaDesconectada/PaginaDesconectada";
import styles from "../../src/styles/Cadastro.module.css"
import Select from "../../components/select/Select";
import UseEstados from "../../components/hooks/UseEstados";
import { useState } from 'react';
import Axios from "axios";
import { useRouter } from "next/router";


const Cadastro = () => {
    const router = useRouter(); // Certifique-se de chamar o hook useRouter corretamente
    //const { pathname } = router;



    
    const [isselected,setIsselected] = useState('medico');
    const {uf} = UseEstados();
    const mudancaRadio =(e)=>{
        setIsselected(e.target.value);
    }
    const cadastrando = async(e)=>{
        e.preventDefault();
        const dados = {};

        if(e.target.elements.nome.value){
            dados.nome = e.target.elements.nome.value;
        }else{
            return alert("nome obrigatorio");
        }   

        if(e.target.elements.email.value){
            dados.email = e.target.elements.email.value;
        }else{
            return alert("email obrigatorio");
        }   
        
        dados.funcao = isselected;
        
        if(e.target.elements.crm){
            if(e.target.elements.crm.value){
                dados.crm = e.target.elements.crm.value;
            }else{
                return alert("crm obrigatorio");
            }
        }else{
            if(e.target.elements.crf.value){
                dados.crf = e.target.elements.crf.value;
            }else{
                return alert("crf obrigatorio");
            }
        }
        if(e.target.elements.estados.value){
            dados.estado = e.target.elements.estados.value;
        }else{
            return alert("estado obrigatorio");
        }
        if(e.target.elements.password.value){
            if (e.target.elements.confirmPassword.value) {
                if (e.target.elements.password.value === e.target.elements.confirmPassword.value) {
                    dados.senha = e.target.elements.password.value;        
                }else{
                    return alert("senhas diferentes");
                }
            }else{
                return alert("repita a senha 'campo obrigatorio'");
            }
        }else{
            return alert("senha obrigatorio");
        }
        try {
            const {data} = await Axios.post('http://localhost:5008/funcionario/registro',dados) 
            console.log(data)
            router.push('/');  
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <PaginaDesconectada>
            <div className={styles.boxCadastro}>
            <div className={styles.titulo}>
            <h1>Cadastro</h1>
            <form onSubmit={cadastrando}>
                
            <Input name='nome' text='Nome' type='text'placeholder='informe seu nome'/>
            <Input name='email' text='E-mail' type='email'placeholder='informe um e-mail valido'/>
            <div className={styles.typeRadio}>
                <Input 
                    name='medico' 
                    text='Medico' 
                    type='radio' 
                    custonClass='radio' 
                    capturandoInput={mudancaRadio} 
                    value={'medico'}
                    checked={isselected === 'medico'} 
                />
                <Input 
                    name='farmaceutico' 
                    text='Farmaceutico' 
                    type='radio' 
                    custonClass='radio' 
                    capturandoInput={mudancaRadio} 
                    value={'farmaceutico'} 
                    checked={isselected === 'farmaceutico'}
                />
            </div>
            <div className={styles.crmCrf}>
                { 
                    isselected === 'medico' ?
                    <Input name='crm' text='CRM' type='text'placeholder='informe seu CRM' custonClass='crm'/>
                    :
                    <Input name='crf' text='CRF' type='text'placeholder='informe seu CRF' custonClass='crf'/>    

                }    
                <Select name='estados' uf={uf} />
            </div>
            <Input name='password' text='Password' type='password'placeholder='informe sua senha'/>
            <Input name='confirmPassword' text='Repita Password' type='password'placeholder='informe sua senha'/>
            <Button type='submit' text='enviar' estilo='Btn-cadastro'/>
            </form>
            </div>
            </div>
           
        </PaginaDesconectada>
    );
}

export default Cadastro;