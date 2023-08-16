const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop')
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>');
})
app.listen(4000);