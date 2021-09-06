import expressAsyncHandler from "express-async-handler";
import express from 'express';
import Product from "../models/productModel.js";

const productRouter=express.Router();

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

export default productRouter;