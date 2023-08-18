
const express=require('express');
const router=express.Router();
const productControl=require('../controller/control')
router.get('/add-product',productControl.getProduct)
router.post('/add-product',productControl.postProduct)

module.exports=router;