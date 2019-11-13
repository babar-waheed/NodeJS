const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        title: "Add Products!", 
        path: "/admin/add-product",
        formCSS: true,
        productCSS: true,
        activeAddProduct: true    
    })
}

exports.postAddProudct = (req, res, next) => {
    console.log(req.body);
    const products = new Product(req.body.title);
    products.save();
    res.redirect('/');
}

exports.getShop = (req, res, next) => {
    //res.sendFile(path.join(rootDir ,'views', 'shop.html'));\
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products, 
        title: 'My Shop',  
        path: "/", 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}