import './Select.css'


const Select = ({name,value,onchange,uf}) => {
      
    
    return (
        <div className="Box-select">
            <label htmlFor={name}>UF</label>
            <select name={name} value={value} onChange={onchange} >
            
                {uf? 
                    uf.map(estado => (
                    <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
                )):<></>
                }
            </select>
       </div>
       
    );
}


export default Select;