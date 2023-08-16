const express=require('express');
const router=express.Router();

router.get('/add-product',(req,res,next)=>{
    res.send('<form method="POST" action="/admin/add-product"><h3>Name of the product</h3><input type="text" name="title"><br><h3>Quantity or size</h3><input type="number" name="quantity"><br><button type="submit">Add Product</button></form>');
})
router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})

module.exports=router;