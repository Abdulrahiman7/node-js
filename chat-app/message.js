const express=require('express');
const router=express.Router();
const fs=require('fs');
router.use(express.json());
router.get('/',(req,res,next)=>{
    fs.readFile('./message.txt','utf-8',(err,data)=> {
        if(err) {
            console.log('no message exists');
            data= 'No message exist';
        }
        res.send(data+`<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/new" method="POST"><input type="text" name="message"><input type="hidden" name="username" id="username"><button type="submit">send message</button></form>`)
    })
})
router.post('/new',(req,res,next)=>{
    
    const newMessage = req.body.message;
    console.log(req.body);
    
    fs.appendFile('./message.txt',`${req.body.username}:${newMessage}`,{flag: 'a'}, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
            res.status(500).send('Error appending to file');
        } else {
            res.redirect('/');
        }
    });
})


module.exports=router;