import './Input.css'

const Input = ({name,text, type, placeholder,capturandoInput,value,custonClass, checked}) => {
    
    
    return (
        <div className={`${"Box-inputs"} ${[custonClass]}`}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={capturandoInput} value={value} checked={checked}/>
        </div>
    );
}

export default Input;