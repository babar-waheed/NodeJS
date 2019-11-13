const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(rootDir ,'views', 'shop.html'));\
    Product.fetchAll(products => {
        console.log("getProducts(): products" + products);
        res.render('shop/product-list', {
            prods: products, 
            title: 'All Products',  
            path: "/products", 
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        console.log("getIndex(): products" + products);
        res.render('shop/index', {
            prods: products, 
            title: 'Shop',  
            path: "/", 
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        title: 'Your Cart',  
        path: "/cart", 
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        title: 'Your Orders',  
        path: "/orders", 
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        title: 'Checkout',  
        path: "/cart", 
    })
}