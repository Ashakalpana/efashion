import jwt from "jsonwebtoken"

 const JWT_RANDON_STR ="cricket"

export const allverifytoken =(req,res,next) =>{

    const token = req.header('auth')
    if(!token){
        return res.status(400).send({errors:"token not present"})
    }
    try{
        const decoded = jwt.verify(token, JWT_RANDON_STR,{expiresIn:'1h'})

        
        req.id= decoded.id
    }
    catch(errors)
    {
        return res.status(400).send({errors:"please authentication using valid token"})
        
    }
    
    next()
} ;  