const path=require('path');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop')
const contactRoutes=require('./routes/contact')

app.use(express.static(path.join(__dirname,'public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);

const errorControl=require('./controller/control');
app.use(errorControl.geterror)
app.listen(4000);