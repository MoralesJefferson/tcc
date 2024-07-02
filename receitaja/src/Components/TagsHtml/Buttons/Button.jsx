import './Button.css'
const Button = ({type,text,estilo,onclick}) => {
    return (
        <div className={`${"Box-button"} ${[estilo]}`}>
            <button type={type} onClick={onclick}>{text}</button>
        </div>
    );
}


export default Button;