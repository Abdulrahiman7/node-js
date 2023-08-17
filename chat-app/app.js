const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const loginRoute=require('./login');
const messageRoute=require('./message');

app.use(loginRoute);
app.use(messageRoute);
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>');
})
app.listen(4000);