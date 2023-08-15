const express=require('express');
const app=express();
app.use((req,res,next)=>{
    console.log('welcome to the node.js');
    next();
})
app.use((req,res,next)=>{
    console.log('welcome to World of Programming');
    res.send('<h1>Welcome to node.js</h1>')
})
app.listen(4000);