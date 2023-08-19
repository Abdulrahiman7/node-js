const path=require('path');
const Product=require('../model/product');
exports.geterror=(req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'../','views','error.html'));
}

exports.getProduct=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','product.html'))
}
exports.postProduct=(req,res,next)=>{
    const product=new Product(req.body.title)
    product.save();
    res.redirect('/');
}

exports.getContact=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','contact.html'))
}
exports.postContact=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','success.html'))
}

exports.getShop=async (req,res,next)=>{
    try {
        const products = await Product.fetchAll();
        res.render('shop', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
}