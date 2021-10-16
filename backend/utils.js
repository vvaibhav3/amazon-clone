import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingsecret",
    {
        expiresIn : '30d',
    });
}

export const isAuth = (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(authorization){
        const token =authorization.slice(7,authorization.length); // authorization format : Bearer XXXXXX => XXXXXX
        jwt.verify(token,process.env.JWT_SECRET || "somethingsecret",(err,decode)=>{
            if(err){
                //401 => unautho.
                res.status(401).send({message : "Invalid token"});
            }
            else{
                //decode is info of user
                req.user=decode;
                next();
            }
        } )
    }
    else{
        //401 => unautho.
        res.status(401).send({message : "No token"});
    }
}