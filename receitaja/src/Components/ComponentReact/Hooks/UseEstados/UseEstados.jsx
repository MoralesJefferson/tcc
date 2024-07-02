import Axios from 'axios';
import { useEffect, useState } from 'react';

const UseEstados = () => {
    const [uf,setUf] = useState();
  
    useEffect(()=>{
        
        const buscaEstados = async()=>{

            const {data} = await Axios.get('https://brasilapi.com.br/api/ibge/uf/v1')
                setUf(data);    
            } 
        
        buscaEstados();

    },[uf])
    
    return{
        uf
    } 
    ;
}

export default UseEstados;