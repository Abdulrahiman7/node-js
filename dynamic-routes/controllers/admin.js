const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.editProduct= (req,res,next) => {
  const editMode=req.query.edit;
  const prodId= req.params.productId;
  if(!editMode){
    return res.redirect('/');
  }
  Product.findId(prodId, product => {
    if(!product) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
}

exports.postEdit= (req,res,next)=> {
  console.log(req.body)
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updateddes=req.body.description;
  const updatedProduct= new Product(prodId,updatedTitle,updatedImageUrl,updateddes, updatedPrice);
  updatedProduct.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.deleteId=(req,res,next)=>{
  const id=req.body.productId;
  Product.delete(id);
  res.redirect('/');
}