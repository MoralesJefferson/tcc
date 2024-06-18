
import './Cadastro.css'
import Input from '../../Components/TagsHtml/Inputs/Input';
import Button from '../../Components/TagsHtml/Buttons/Button';
import Form from '../../Components/TagsHtml/Forms/Form'
import Select from '../../Components/TagsHtml/Select/Select';
import Axios from 'axios';
import { useState } from 'react';

import UseEstados from '../../Components/ComponentReact/Hooks/UseEstados/UseEstados';
const Cadastro = () => {
    const [isselected,setIsselected] = useState('medico');
    
    const {uf} = UseEstados();
    const tratandoFormularioCadastro = async (e)=>{
        e.preventDefault();
        
        const dados = {};
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

        const {data} = await Axios.post('http://localhost:3500/registro',dados) 
        console.log(data);


    }
    const onChangeRadio =(e)=>{
        setIsselected(e.target.value)
        
    }

   
    
        
    return (
        <div className="Box-cadastro">

        <Form onSubmit={tratandoFormularioCadastro} text='Cadastro'>
            <Input name='email' text='E-mail' type='email'placeholder='informe um e-mail valido'/>
            <div className="typeRadio">
                <Input 
                    name='lembreDeMim' 
                    text='Medico' 
                    type='radio' 
                    custonClass='radio' 
                    capturandoInput={onChangeRadio} 
                    value={'medico'}
                    checked={isselected === 'medico'} 
                />
                <Input 
                    name='lembreDeMim' 
                    text='Farmaceutico' 
                    type='radio' 
                    custonClass='radio' 
                    capturandoInput={onChangeRadio} 
                    value={'farmacia'} 
                    checked={isselected === 'farmacia'}
                />
            </div>
            <div className="Crm-crf">
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
               
            
        </Form>
   </div>
    );
}

export default Cadastro;


