
const express=require('express');
const router=express.Router();
const contactControl=require('../controller/control')
router.get('/contactus',contactControl.getContact)
router.post('/success',contactControl.postContact)

module.exports=router;