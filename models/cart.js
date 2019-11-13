const path = require('path');
const fs = require('fs');
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart{

    static addProduct(id, productPrice){
        console.log("Cart Class: ", id);
        //Save [products: [{id: 1, qty: 1}], totalPrice: 0] 

        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex];

            console.log("Updating Existing: ", existingProduct);
            let updatedProduct;

            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.qty = (updatedProduct.qty + 1);
                console.log("Updated New: ", updatedProduct);
                //cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
                console.log("Updated Existing: ", cart.products);
            }else{
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = (cart.totalPrice + +productPrice)
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) throw err;
                console.log('Saved!');
            })
        })

    } 

    static deleteProduct(id, productPrice){

        fs.readFile(p, (err, fileContent) => {
            if(err) throw err;
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;

            console.log("updatedCart: ", updatedCart);

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
        
            console.log(":::", updatedCart.totalPrice , productPrice , productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if (err) throw err;
                console.log('Saved!');
            })

        });

    }

}