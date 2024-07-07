const {genSalt, compareSync ,hashSync} =require('bcrypt')

const geraHash = async(senha)=>{
   try {
        const salt = await genSalt(8);
        return hashSync(senha,salt);
   } catch (error) {
        return error
   } 
}

const comparaHash=async(senha , senhaHash)=>{
    try {
        return compareSync(senha,senhaHash);    
    } catch (error) {
        console.log(error)
        return error
    }
}


module.exports={
    geraHash,
    comparaHash
}
