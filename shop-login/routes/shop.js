
const express=require('express');
const router=express.Router();
const shopControl=require('../controller/control')
router.get('/',shopControl.getShop)

module.exports=router;