const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/add-product', {
        title: "Add Products!", 
        path: "/admin/add-product",
    })
}

exports.postAddProudct = (req, res, next) => {
    console.log("getAddProduct(): req.body" , req.body);
    const title = req.body.title;
    const image = req.body.url;
    const price = req.body.price;
    const desc = req.body.desc;

    const products = new Product(title, image, price, desc);
    products.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log("getProducts(): products" + products);
        res.render('admin/products', {
            prods: products, 
            title: 'Admin Products',  
            path: "/admin/products", 
        });
    });
}