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

app.listen(PORT,(req,res)=>{
    console.log(`running on http://localhost:${PORT}`);
});