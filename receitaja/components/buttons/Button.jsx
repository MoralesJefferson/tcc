import styles from '../../src/styles/Button.module.css'
const Button = ({type,text,estilo,onclick}) => {
    return (
        <div className={`${styles.Boxbutton} ${[estilo]}`}>
            <button type={type} onClick={onclick}>{text}</button>
        </div>
    );
}


export default Button;