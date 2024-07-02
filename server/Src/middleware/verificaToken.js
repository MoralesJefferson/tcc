
const jwt =require('jsonwebtoken')

const verificaToken=(req,res,next)=>{ 
    try{
        const token = req.headers.authorization

        if (!token){
            return res.status(401).json({'error':'acesso negado!!!'})
        }
        const secret = process.env.SECRET 
        const user = jwt.verify(token,secret)
        req.usuario = user.usuarioId
        return next()

    }catch(error) {

        res.status(400).json({'error':'Token inválido!!!'})

    }
}

module.exports={
    verificaToken
}