 import { Navigate, } from 'react-router-dom'

const setTokenUser = (data, redireciona) => {
    if (data.token) {
        
        localStorage.setItem('user', JSON.stringify(
            {
                'usuario': data.name,
                'token': data.token,
            })
        )
        redireciona('/homepage')
    }
}

const getToken =()=>{
    
    return localStorage.getItem('user')

}

export { setTokenUser, getToken }