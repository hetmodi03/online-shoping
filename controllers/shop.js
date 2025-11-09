const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
      res.render('shop/product-list',{
      prods:products,
      pageTitle:'All products',
      path:'/products'
    });
  }).catch(err => {
    console.log(err);
  });
}; 

exports.getproduct = (req, res, next) => {
  const prodId = req.params.productid;
  Product.findByPk(prodId)
  .then(product =>{
       res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
    });
  })
    .catch(err => {console.log(err)});
 
};
exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
      res.render('shop/index',{
      prods:products,
      pageTitle:'shop',
      path:'/'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  Cart.getcart(cart => {
    Product.findByPk(products => {
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
           cartProducts.push({productData:product,qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProducts
      });
    });
  });
 
};

exports.postCart = (req, res, next) => {
  const prodid = req.body.productid;
  Product.findbyid(prodid, product=>{
    Cart.addProduct(prodid, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDelete = (req,res,next) => {
  const prodid = req.body.productid;
  Product.findbyid(prodid, product => {
    Cart.deleteproduct(prodid, product.price);
    res.redirect('/cart');
  });

}

exports.getorder = (req, res, next) => {
  res.render('shop/order', {
    path: '/order',
    pageTitle: 'my order'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
