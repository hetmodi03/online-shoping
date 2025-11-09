const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
      res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });

};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageurl = req.body.imageurl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title:title,
    price:price,
    imageurl:imageurl,
    description:description
  }).then(result =>{
    console.log(result);
  }).catch(err => {
    console.log(err);
  })
};

exports.getEditproduct = (req,res,next) =>{
  const editmode = req.query.edit;
  if(!editmode){
    return res.redirect('/');
  }
  const prodid = req.params.productid;
  Product.findByPk(prodid).then( product =>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editmode,
      product: product
   });
   }).catch(err => {
    console.log(err);
   });
  };

exports.postEditproduct = (req,res,next) => {
   const prodid = req.body.productid;
   const updatedtitle = req.body.title;
   const updatedprice = req.body.price;
   const updatedimageUrl = req.body.imageurl;
   const updatedDesc = req.body.description;
   Product.findByPk(prodid)
   .then(product => {
    product.title = updatedtitle;
    product.price = updatedprice;
    product.imageurl = updatedimageUrl;
    product.description = updatedDesc;
    return product.save();
   }).then(result => {
    console.log('updated products');
    res.redirect('/admin/products')
   }).catch(err => console.log(err));
};


exports.postDeleteproduct = (req,res,next) => {
  const prodid = req.body.productid;
  Product.findByPk(prodid)
  .then(product =>{
     return product.destroy();
  }).then(result => {
    console.log(result);
    res.redirect('/admin/products');
  }).catch(err => console.log(err)); 
};

exports.getProducts = (req, res, next) => {
   Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
    }).catch(err => console.log(err));

};
