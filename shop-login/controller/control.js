const path=require('path');
exports.geterror=(req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'../','views','error.html'));
}

exports.getProduct=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','product.html'))
}
exports.postProduct=(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
}

exports.getContact=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','contact.html'))
}
exports.postContact=(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(__dirname,'../','views','success.html'))
}

exports.getShop=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'))
}