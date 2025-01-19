import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
dotenv.config();

export default function userMiddleware(req,res,next){
    const token = req.body.token;
    
    if(!token){
        return res.status(403).json('token not found you are logged out');
    }else{
        const isverfiy = JWT.verify(token,process.env.JWT_PASSWORD);

        if(isverfiy){
            req.id = isverfiy.id;
            next();
        }else{
            res.status(401).json("incorrect token")
        }
    }
}