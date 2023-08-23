const Product = require('../models/product');
const Cart=require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then((rows, fieldData)=>{
    res.render('shop/product-list', {
      prods: rows[0],
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err));

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then((rows, fieldData)=>{
    res.render('shop/index', {
      prods: rows[0],
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err));
};

exports.getDetails=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findId(prodId)
  .then(([rows])=> {
    console.log(rows)
    res.render('shop/product-detail',{
      produ: rows[0],
      pageTitle: rows[0].title,
      path: '/products'
    })
  })
  .catch(err => {
  res.redirect('/product');  
  });
}

exports.getCart = (req, res, next) => {
  Cart.fetchAll(products => {
    res.render('shop/cart', {
      prods: products.product,
      pageTitle: 'Cart',
      path: '/cart',
      totalPrice: products.totalPrice
    });
  });
};

exports.postCart= (req,res,next) => {
  const prodId=req.body.cartProductId;
  Product.findId(prodId, (product)=>{
    Cart.addProduct(product.id, product.title, product.imageUrl, product.description, product.price)
  })
  res.redirect('/cart');
}

exports.postDelete= (req,res,next)=>{
  console.log('route enterd')
  const prodId=req.body.productId;
  Cart.delete(prodId);
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
