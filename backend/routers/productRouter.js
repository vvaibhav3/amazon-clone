import expressAsyncHandler from "express-async-handler";
import express from 'express';
import Product from "../models/productModel.js";
import multer from "multer";
const productRouter=express.Router();

var imageName="";
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'frontend/public/images');
    },
    filename:function(req,file,cb){
        imageName=Date.now()+"-"+file.originalname.replace(" ","-");
        cb(null,imageName);
    }
});

var upload=multer({storage:storage}).single("file");

productRouter.get('/',expressAsyncHandler(async (req,res) => {
    const products=await Product.find({}) //to get all products
    res.send(products);
}))

productRouter.get('/seed',expressAsyncHandler(async (req,res) => {
    const createdProducts= await Product.insertMany(data.products);
    res.send({createdProducts});
}));

//to avoid taking /seed as id we will define product detail fetch api at last
productRouter.get('/:id', expressAsyncHandler(async (req,res) => {
    const product= await Product.findById(req.params.id);
    if(product)
        res.send(product);
    else
        res.status(404).send({message:"Product not found..."});
}));


productRouter.post("/add",expressAsyncHandler(async(req,res)=>{

    await upload(req,res,function(err){
        if(err instanceof multer.MulterError){
            res.status(500).send(err);
        }
        else if(err){
            res.status(500).send(err);
        }
        // console.log(req.file);
        // res.status(200).send(req.file);

        const product=new Product({
            name:req.body.name,
            brand:req.body.brand,
            price:req.body.price,
            rating:req.body.rating,
            category:req.body.category,
            description:req.body.description,
            countInStock:req.body.stock,
            numReviews:Math.floor(Math.random()*100),
            image:"/images/"+imageName
        });

        try{
            const newProduct=product.save();
            res.send({message:"Product added"});
        }
        catch(err){
            res.send({message:err.getMessage()});
        }

    });
    
}));

export default productRouter;