const Product = require('../models/product');
const Cart=require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getDetails=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findId(prodId, product=>{
    res.render('shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
  
}

exports.getCart = (req, res, next) => {
  console.log('got');
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
