import './Button.css'
const Button = ({type,text,estilo}) => {
    return (
        <div className={`${"Box-button"} ${[estilo]}`}>
            <button type={type}>{text}</button>
        </div>
    );
}


export default Button;