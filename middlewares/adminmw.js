import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { User } from '../db';
dotenv.config();

export default async function adminMiddleware(req,res,next){
    const token = req.body.token;
    
    if(!token){
        return res.status(403).json('token not found you are logged out');
    }else{
        const isverfiy = JWT.verify(token,process.env.JWT_PASSWORD);

        const result = await User.findOne({
            _id:isverfiy.id,
            isAdmin:true
        })

        if(result){
            req.id = isverfiy.id;
            next();
        }else{
            res.status(401).json("incorrect token")
        }
    }
}