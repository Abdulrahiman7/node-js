const fs = require('fs');
const path = require('path');

const p=path.join(path.dirname(require.main.filename),'data','products.json')

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id= id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      
      if(this.id){
        console.log(products, this.id)
        const updatedProduct=[...products];
      const existingProductIndex= products.findIndex(prod => prod.id === this.id);
      updatedProduct[existingProductIndex]=this;
      console.log(updatedProduct)
      fs.writeFile(p, JSON.stringify(updatedProduct), err => console.log(err));
      }else {
      this.id=Math.random().toString();
      console.log(products);
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    }
  });
  }


  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findId(id, cb){
    getProductsFromFile(products => {
      const produc=products.find(p => p.id === id);
      cb(produc);
    })
  }

  static delete(id){
    getProductsFromFile(products => {
      const produc=products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(produc), (err)=>{
        console.log(err);
      })
    })
  }
};
