const fs=require('fs');
const path=require('path');
module.exports= class Cart{
    static addProduct(id, price){
const p=path.join(__dirname,'../','data','cart.json');
console.log(p);
      fs.readFile(p, (err, filecontent)=>{
        let cart={product:[],totalPrice:0};
        if(!err){
            cart=JSON.parse(filecontent);
        }
        console.log(err);
        const existingProductIndex= cart.product.findIndex(prod => prod.id === id);
        const existingProduct= cart.product.find(prod => prod.id === id);
        let updatedProduct;
        if(existingProduct){
            updatedProduct= {...existingProduct};
            updatedProduct.qty= updatedProduct.qty + 1;
            cart.product[existingProductIndex] = updatedProduct;
        }else{
            updatedProduct= { id: id, qty:1};
            cart.product = [...cart.product, updatedProduct];
        }
        cart.totalPrice=cart.totalPrice + +price;
        console.log(cart.totalPrice);

        fs.writeFile(p,JSON.stringify(cart),(err)=>{
            console.log(err);
        })
      })  
    }
}