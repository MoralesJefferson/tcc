import './Input.css'

const Input = ({name,text, type, placeholder,capturandoInput,value,custonClass}) => {
    
    
    return (
        <div className={`${"Box-inputs"} ${[custonClass]}`}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={capturandoInput} value={value}/>
        </div>
    );
}

export default Input;