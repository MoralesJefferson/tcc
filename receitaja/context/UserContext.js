import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
    const [tipoUser, setTipoUser] = useState(); // pode ser 'medico', 'farmaceutico' ou null
    useEffect(() => {
        const storedRole = localStorage.getItem('tipoUser');
        if (storedRole) {
          setTipoUser(storedRole);
        }
      }, []);
    
      
      useEffect(() => {
        if (tipoUser) {
          localStorage.setItem('tipoUser', tipoUser);
        }
      }, [tipoUser]);
    return (
        <UserContext.Provider value={{ tipoUser, setTipoUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
  return useContext(UserContext);
};
