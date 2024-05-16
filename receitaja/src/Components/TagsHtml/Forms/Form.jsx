import './Form.css'
const Form = ({onSubmit, children, text}) => {

    return (
        <div className="Box-form">
            
            <h1>{text}</h1>  

            <form  onSubmit={onSubmit} >
                {children}
            </form>
        </div>
    );
}

export default Form;