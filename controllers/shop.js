const Product = require('../models/product');
//const Cart = require('../models/cart');

//Shop Navigation Item
exports.getIndex = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            console.log("getIndex() SHOP Navigation Item ***", products)
            res.render('shop/index', {
                prods: products, 
                title: 'Shop',  
                path: "/", 
            });
        })
        .catch(err => {
            console.log(err);
        })
}

//Products Navigation Item
exports.getProducts = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            console.log("getProducts() Products Navigation Item ***" + products);
            res.render('shop/product-list', {
                prods: products, 
                title: 'All Products',  
                path: "/products", 
            });
        })
        .catch(err => {
            console.log(err);
        })
}

//Proudct Details Inner Page!
exports.getProduct = (req, res, next) => {
    
    const id = req.params.productId;
    
    Product.findById(id)
    .then(product => {
        console.log("getProduct() Product Detials Inner Page ***" + product);
        res.render('shop/product-detail', {
            title: product.title,
            path: "/products",
            product: product
        });
    })
    .catch(err => {
        console.log(err);
    })
}

//View Cart
exports.getCart = (req, res, next) => {
    
    let products = []
    req.user.getCart()
    .then(products => {
        res.render('shop/cart', {
            title: 'Your Cart',  
            path: "/cart", 
            products: products
        })
    })
    .catch(err => {
        console.log(err);
    })       
}

//Post to cart.
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            console.log("CONTROLLER [SHOP]: ", "findById(prodId)", product);
            req.user.addToCart(product)
            .then(result => {
                res.redirect('/cart');
            })
        })
        .catch(err => {
            console.log("CONTROLLER [SHOP]: ", "findById(prodId) ERROR", err);
        })
}

//Delete product in the cart
exports.postCartDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    req.user.deleteItemFromCart(id)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
}

//Post order & delete cart..
exports.postOrder = (req, res, next) => {
    
    req.user.addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

//Get orders for order page
exports.getOrders = (req, res, next) => {

    req.user.getOrders()
    .then(orders => {
        res.render('shop/orders', {
            title: 'Your Orders',  
            path: "/orders", 
            orders: orders
        })
    })
    .catch(err => {
        console.log(err);
    })
    
}
