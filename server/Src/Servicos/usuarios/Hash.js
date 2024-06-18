const {genSalt, compare ,hash} =require('bcrypt')

const geraHash = async(senha)=>{
    const salt = await genSalt(8);
    return await hash(senha,salt);
}

const comparaHash=async(senha , senhaHash)=>{
    return await bcrypt.compare(senha,senhaHash);
}


module.exports={
    geraHash,
    comparaHash
}
