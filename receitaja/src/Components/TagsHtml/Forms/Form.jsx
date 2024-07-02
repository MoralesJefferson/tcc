import './Form.css'
const Form = ({onSubmit, children, text,custonClass}) => {

    return (
        <div className={`${"Box-form"} ${[custonClass]}`}>
            
            <h1>{text}</h1>  

            <form  onSubmit={onSubmit} >
                {children}
            </form>
        </div>
    );
}

export default Form;