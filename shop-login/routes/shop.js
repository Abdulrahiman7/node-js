const path=require('path');
const rootName=require('../util/path');
const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootName,'views','shop.html'))
})

module.exports=router;