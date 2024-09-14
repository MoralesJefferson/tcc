import styles from '../../src/styles/Select.module.css'


const Select = ({name,value,onchange,uf}) => {
      
    
    return (
        <div className={styles.BoxSelect}>
            <label htmlFor={name} className={styles.label}>UF</label>
            <select  className={styles.select} name={name} value={value} onChange={onchange} >
            
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