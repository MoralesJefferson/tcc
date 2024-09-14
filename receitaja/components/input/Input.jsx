import styles from '../../src/styles/Input.module.css'

const Input = ({name,text, type, placeholder,capturandoInput,value,custonClass, checked}) => {
    
    
    return (
        <div className={`${styles.BoxInputs} ${styles[custonClass]}`}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={capturandoInput} value={value} checked={checked}/>
        </div>
    );
}

export default Input;