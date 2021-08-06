import express from "express";
import data from "./data.js";
const app=express();

const PORT=process.env.PORT || 5000;
app.get("/",(req,res) =>{
    res.send("server is up..");
});

app.get("/api/products",(req,res)=>{
    res.send(data.products);
});

app.get("/api/products/:id",(req,res)=>{
    const product=data.products.find((x) => x._id=== (req.params.id));
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message:"Error product not found... "});
    }
});

app.listen(PORT,(req,res)=>{
    console.log(`running on http://localhost:${PORT}`);
});