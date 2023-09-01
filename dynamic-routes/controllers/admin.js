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
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
 
  .then(()=> {
    console.log('product created successfully');
    res.redirect('/');
  }).catch(err => console.log(err));
  
};

exports.editProduct= (req,res,next) => {
  const editMode=req.query.edit;
  const prodId= req.params.productId;
  if(!editMode){
    return res.redirect('/');
  }
  Product.findAll({where:{id:prodId}})
    .then((products)=> {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: products[0]
    });
  })
  .catch(()=> res.redirect('/'))
}

exports.postEdit= (req,res,next)=> {
  console.log(req.body)
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updateddes=req.body.description;
  Product.findAll({where: {id:prodId}})
  .then(([product])=> {
    product.title=updatedTitle;
    product.imageUrl=updatedImageUrl;
    product.price=updatedPrice;
    product.description=updateddes;
    return product.save();
  })
  .then(()=>{
    console.log('product updated');
    res.redirect('/');
  })
  .catch(err => console.log(err));
}


exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
    
};

exports.deleteId=(req,res,next)=>{
  const id=req.body.productId;
  Product.findAll({where: {id:id}})
  .then(([product])=> {
    return product.destroy();
    
  })
  .then(()=>{
    console.log('deleted successfully');
    res.redirect('/');
  })
  .catch(err => console.log(err));
}