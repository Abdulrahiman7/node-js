const Product = require('../models/product');
const order=require('../models/order')

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err));

};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err));
};

exports.getDetails=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findAll({where:{id:prodId}})
  .then(([rows])=> {
    console.log(rows)
    res.render('shop/product-detail',{
      produ: rows,
      pageTitle: rows.title,
      path: '/products'
    })
  })
  .catch(err => {
  res.redirect('/product');  
  });
}

exports.getCart = (req, res, next) => {
  req.user
  .getCart()
  .then((cart)=>{
    return cart.getProducts()
    .then((products) => {
    res.render('shop/cart', {
          prods: products,
          pageTitle: 'Cart',
          path: '/cart',
        });
      }) .catch(err => console.log(err))
  })
  .catch(err => console.log(err));
};

exports.postCart= (req,res,next) => {
  const prodId=req.body.cartProductId;
  let fetchedCart;
  let newQuantity=1;
  req.user
  .getCart()
  .then(cart => {
    fetchedCart=cart;
    return cart.getProducts({where: {id: prodId}});
  })
  .then(products =>{
    
    let product;
    if(products.length>0)
    {
      product= products[0];
    }
    if(product)
    {
      const oldQuantity=product.cartItem.quantity;
      newQuantity=oldQuantity + 1;
      return product;
    }
    return Product.findAll({where : {id: prodId}})
  })
    .then((product) => {
      return fetchedCart.addProduct(product , {through : {quantity: newQuantity}});
    })
    .then(()=> res.redirect('/cart'))
  .catch(err => console.log(err))
}

exports.postDelete= (req,res,next)=>{
  const prodId=req.body.productId;
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({where : {id: prodId}})
  })
  .then(([product]) => {
    console.log(product.cartItem)
    return product.cartItem.destroy();
  })
  .then(()=> res.redirect('/cart') )
  .catch(err =>console.log(err))  
}

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders({include: ['products']})
  .then(products => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      order:products
    });
  })
   .catch(err => console.log(err));   

};

exports.postOrders = (req, res, next) =>{
  let fetchedCart;
  req.user
  .getCart()
  .then(cart => {
    fetchedCart=cart;
    return cart.getProducts();
  })
  .then(products => {
    req.user
    .createOrder()
    .then(order => {
      return order.addProducts(products.map(product => {
        product.OrderItem= {quantity: product.cartItem.quantity};
        return product;
      }))
    })
    .catch(err => console.log(err));
  })
  .then(result => {
    return fetchedCart.setProducts(null);
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
