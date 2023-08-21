const fs=require('fs');
const path=require('path');
const p=path.join(__dirname,'../','data','cart.json');
module.exports= class Cart{
    static addProduct(id, title, imageUrl, description, price){

      fs.readFile(p, (err, filecontent)=>{
        let cart={product:[],totalPrice:0};
        if(!err){
            cart=JSON.parse(filecontent);
        }
        const existingProductIndex= cart.product.findIndex(prod => prod.id === id);
        const existingProduct= cart.product.find(prod => prod.id === id);
        let updatedProduct;
        if(existingProduct){
            updatedProduct= {...existingProduct};
            updatedProduct.qty= updatedProduct.qty + 1;
            cart.product[existingProductIndex] = updatedProduct;
        }else{
            updatedProduct= { id: id,title: title, imageUrl: imageUrl, description: description, price:price, qty:1};
            cart.product = [...cart.product, updatedProduct];
        }
        cart.totalPrice=cart.totalPrice + +price;
        console.log(cart.totalPrice);

        fs.writeFile(p,JSON.stringify(cart),(err)=>{
            console.log(err);
        })
      })  
    }

    static async fetchAll(cb)
    {
        
        fs.readFile(p, (err,data)=>{
            if(err){
                console.log('file is empty')
            }else{
                cb(JSON.parse(data))
            }
        })
    }

    
}