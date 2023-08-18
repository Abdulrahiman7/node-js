const path=require('path');
const rootName=require('./util/path');
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


app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootName,'views','error.html'));
})
app.listen(4000);