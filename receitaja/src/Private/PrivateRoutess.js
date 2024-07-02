import { Navigate } from "react-router-dom";
import { getToken } from "../Auth/Auth";

const PrivateRoutess = ({ children }) => {
    
    return (
        getToken() ? children : <Navigate to='/' />    
    );
}

export default PrivateRoutess;

