const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/add-product',(req,res,next)=>{
    res.send('<form method="POST" action="/product"><h3>Name of the product</h3><input type="text" name="title"><br><h3>Quantity or size</h3><input type="number" name="quantity"><br><button type="submit">Add Product</button></form>');
})
app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})
app.use('/',(req,res,next)=>{
    res.send('<h1>Welcome to node.js</h1>')
})
app.listen(4000);