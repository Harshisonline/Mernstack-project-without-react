import { Router } from "express";
import userMiddleware from "../middlewares/usermw";
import bcrypt from 'bcrypt';
import { User,Course } from "../db";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const router = Router();


router.post('/signup',async (req,res)=>{
    const {username,password,isAdmin}=req.body;
    const hiddenPass=await bcrypt.hash(password,5);

    const result = await User.create({
        username,
        password:hiddenPass,
        isAdmin
    })

    res.json({message:"signed up successfully"});
})

router.post('/signin',async (req,res)=>{
    const {username,password}=req.body;
    const result= await User.findOne({
        username,
    })

    if(!result){
        res.json({message:"user not found"})
    }

    const isVerify= await bcrypt.compare(password,result.password);

    if(isVerify){
        const token=await jwt.sign({
            id:result._id
        },process.env.JWT_PASSWORD)
        res.json({token:token})
    }else{
        res.json({message:"wrong credentials"})
    }

})

router.use(userMiddleware);

router.get('/purchases', async (req, res) => {
    const userId = req.id;

    try {
        const user = await User.findById(userId).populate('purchases');

        if (user) {
            res.json({
                message: "User purchases retrieved successfully",
                purchases: user.purchases
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (e) {
        res.status(500).json({
            message: "An error occurred",
            error: e.message
        });
    }
});


router.post('/purchase',async (req,res)=>{
    const userId=req.id;
    const {courseId} = req.body;
    const result=await User.findByIdAndUpdate(userId,{$addToSet:{purchases:courseId}},{new:true}).populate('purchases')

    if(result){
        res.json({
            message:"success",
            docs:result
        })
    }else{
        res.send("error occured")
    }
})

router.get('/preview', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json({ courses });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});