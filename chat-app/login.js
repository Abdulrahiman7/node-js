const express=require('express');
const router=express.Router();
const fs=require('fs');

router.get('/login',(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><h3>Enter Username</h3><br><input type="text" name="username" id="username"><button type="submit">Login</button></form>')
})
router.post('/',(req,res,next)=>{
    const value=req.body.username;
    console.log(value);
    res.redirect('/');
})

module.exports=router;