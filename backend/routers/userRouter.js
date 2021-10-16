import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter=express.Router();

//async because mongoose is async in nature
userRouter.get('/seed', expressAsyncHandler( async (req, res) => {
    //to remove all users
    // await User.remove({});
    const createdUsers= await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin',expressAsyncHandler(async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        }
        else
            res.status(401).send({message:"Invalid email or password"});
    }
    else
        res.status(401).send({message:"Invalid email or password"});
    
    return;
}));

userRouter.post('/register',expressAsyncHandler(async (req,res) => {
    const user=new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8) 
    });
    const createdUser=await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
    
}));

userRouter.get("/:id",expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send({message:"User not found..."});
    }
}));

export default userRouter;