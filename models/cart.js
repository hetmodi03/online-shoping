const fs = require('fs');
const path = require('path');
// const { static } = require('express');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

  module.exports = class cart{
    static addProduct(id,productPrice) {
        // fetch the previous cart
      fs.readFile(p, (err, filecontent)=>{
          let cart = {products:[],totalPrice:0};
          if (!err){
              cart =JSON.parse(filecontent);
          }
        //   analyze the cart => find exsting product
        const existingProductIndex = cart.products.findIndex(prod => prod.id ===id);
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        // add new product / increase quantity
        if (existingProduct ){
            updatedProduct = {...existingProduct};
            updatedProduct.qty = updatedProduct.qty +1; 
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct; 
        }
        else{
            updatedProduct ={ id:id, qty:1};
            // change
            cart.products =  [...cart.products, updatedProduct];

        }
        cart.totalPrice = cart.totalPrice + +productPrice;

        fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
        });
    });
};


        static deleteproduct(id, productPrice){
            fs.readFile(p,(err,filecontent) => {
                if(err){
                    return; 
                }
        const updatedcart = {...JSON.parse(filecontent)};
        const product = updatedcart.products.find(prod => prod.id === id);
        if(!product){
            return;
        }
        const productQty = product.qty;
        updatedcart.products = updatedcart.products.filter(prod => prod.id !== id);
        updatedcart.totalPrice = updatedcart.totalPrice - productPrice * productQty;
        fs.writeFile(p, JSON.stringify(updatedcart), err => {
            console.log(err);
        });     
            
            });

        }
        static getcart(cb){
            fs.readFile(p,(err,filecontent) => {
                const cart = JSON.parse(filecontent);
                if(err){
                    cb(null);
                }else{
                    cb(cart);
                }
            });
        }
        
    }