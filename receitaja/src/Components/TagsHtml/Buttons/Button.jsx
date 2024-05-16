import './Button.css'
const Button = ({type,text}) => {
    return (
        <div className="Box-button">
            <button type={type}>{text}</button>
        </div>
    );
}

export default Button;