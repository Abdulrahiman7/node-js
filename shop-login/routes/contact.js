const path=require('path');
const rootName=require('../util/path');
const express=require('express');
const router=express.Router();

router.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootName,'views','contact.html'))
})
router.post('/success',(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(rootName,'views','success.html'))
})

module.exports=router;