const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        title: "Add Products!", 
        path: "/admin/add-product",
        editing: false
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

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    const productId = req.params.productId;

    Product.findById(productId, product =>{
        res.render('admin/edit-product', {
            title: "Edit Products!", 
            path: "/admin/edit-product",
            editing: editMode,
            product: product
        })
    })
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

exports.postEditProudct = (req, res, next) => {

    console.log("req.body", req.body);
    const id = req.body.id;
    const title = req.body.title;
    const image = req.body.url;
    const price = req.body.price;
    const desc = req.body.desc;

    const products = new Product(id, title, image, price, desc);
    products.save();
    res.redirect('/admin/products');
}

