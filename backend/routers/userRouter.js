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

export default userRouter;