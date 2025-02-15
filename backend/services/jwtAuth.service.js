const jwt = require('jsonwebtoken');


const jwtAuthToken =  (req,res,next) =>{
    
    if(req.headers.authorization){
        const token  = req.headers.authorization.split(' ')[1];
    }else{
        throw new error('Authorization header missing');
    }
    
    

    if(!token) return res.status(401).json({error:'unauthorized'});


    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decodedtoken;
        next();
    } catch (error) {
         console.log(error);
         res.status(401).json({message:'invalid token'});
    }
}


const generateToken = (userData) =>{
   return  jwt.sign(userData,process.env.JWT_SECRET_KEY,{expiresIn:30000});
}


module.exports  ={
    jwtAuthToken,
    generateToken
}