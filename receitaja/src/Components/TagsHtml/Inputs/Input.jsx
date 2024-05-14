const Input = ({name,text, type, placeholder,capturandoInput,value}) => {
    
    
    return (
        <div className="inputs">
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} placeholder={placeholder} onChange={capturandoInput} value={value}/>
        </div>
    );
}

export default Input;