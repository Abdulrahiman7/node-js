const db=require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id= id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title, imageUrl, price, description) VALUES(?,?,?,?)',[this.title,this.imageUrl, this.price, this.description]);
  }


  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static findId(id){
   return db.execute(`SELECT * FROM products WHERE products.id=?`,[id]);
  }

  static delete(id){
    return db.execute(`DELETE FROM products WHERE id=?`,[id]);
  }
};
