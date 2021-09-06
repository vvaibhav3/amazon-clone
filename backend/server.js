import express, { urlencoded } from "express";
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from 'dotenv';

dotenv.config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect( process.env.MONGODB_URL ||  "mongodb://localhost/amazon",{
useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true,
});

const PORT=process.env.PORT || 5000;

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);


app.get("/",(req,res) =>{
    res.send("server is up..");
});

// app.get("/api/products",(req,res)=>{
//     res.send(data.products);
// });

// app.get("/api/products/:id",(req,res)=>{
//     const product=data.products.find((x) => x._id=== (req.params.id));
//     if(product){
//         res.send(product);
//     }
//     else{
//         res.status(404).send({message:"Error product not found... "});
//     }
// });

app.use((err,req,res,next) => {
    res.status(500).send({message:err.message});
});

app.listen(PORT,(req,res)=>{
    console.log(`running on http://localhost:${PORT}`);
});