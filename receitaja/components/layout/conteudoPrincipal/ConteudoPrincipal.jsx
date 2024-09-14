/*import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";
import styles from "../../src/styles/ConteudoPrincipal.module.css"
import { useState } from "react";

const ConteudoPrincipal = ({children}) => {
    const [estado,setEstado]=useState('desconecatado')
    return (
     <>
        <NavBar/>
        <div className={`${styles.conteudoPrincipal} ${styles[estado]} `}>
            {children}
        </div>
        <Footer/>
     </>   
    );
}

export default ConteudoPrincipal;*/
import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";
import styles from "../../../src/styles/ConteudoPrincipal.module.css";
import { useState } from "react";
import useAuth from "../../hooks/UseAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
//import { useRouter } from 'next/router';
const ConteudoPrincipal = ({ children }) => {
    const router = useRouter(); 
    const [estado, setEstado] = useState('');
    
    useEffect(()=>{
        console.log(router.asPath)
        if(router.asPath==='/' || router.asPath.includes('/sobre') 
            || router.asPath.includes('/vantagens') 
            || router.asPath.includes('/contato') 
            || router.asPath.includes('/Cadastro') 
            || router.asPath.includes('/recuperaSenha')
        ){
            setEstado('desconectado')
        }else if( router.asPath.includes('/prescricao/listaPrescricao') 
                || router.asPath.includes('/prescricao/registraPrescricao')
        ){
            setEstado('conectado')
        }else{
            setEstado('error')
        }
    },[router.asPath])
     
    
    //
    console.log("XX",router.asPath)
    return (
        <>
            <NavBar statusNav={estado} />
            <div className={`${styles[estado]}`}>

                {children}
            </div>
            <Footer statusFot={estado}/>
        </>
    );
}

export default ConteudoPrincipal;

