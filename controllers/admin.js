const Product = require('../models/product');

//Add Product Navigation item
//Responsible for rendering HTML Form
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        title: "Add Products!", 
        path: "/admin/add-product",
        editing: false
    })
}

//Add new Proudct from the form!
exports.postAddProudct = (req, res, next) => {

    req.user.createProduct({
        title: req.body.title,
        price: req.body.price,
        description: req.body.desc,
        imageUrl: req.body.url
    })
    .then(result => {
        console.log("Product Created ***");
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err) 
    })

}

//Edit Product CTA
exports.getEditProduct = (req, res, next) => {
    
    const editMode = req.query.edit;
    const productId = req.params.productId;

    req.user.getProducts({where: {id: productId}})
        .then(products =>{
            console.log("getEditProduct() Edit Product ***", products);
            res.render('admin/edit-product', {
                title: "Edit Products!", 
                path: "/admin/edit-product",
                editing: editMode,
                product: products[0]
            })
        })
        .catch(err => {
            console.log(err);
        })
}

//Admin Proudcts.
exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            console.log("getProducts(): Admin Products ***" + products);
            res.render('admin/products', {
                prods: products, 
                title: 'Admin Products',  
                path: "/admin/products", 
            });
        })
        .catch(err => {
            console.log(err);
        })
}

//Edit Proudct Update Query
exports.postEditProudct = (req, res, next) => {

    const id = req.body.id;
    const title = req.body.title;
    const image = req.body.url;
    const price = req.body.price;
    const desc = req.body.desc;

    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.price = price;
            product.description = desc;
            product.imageUrl = image;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

//Delete Product
exports.postDeleteProudct = (req, res, next) => {
    const prodId = req.body.id;
    Product.findByPk(prodId)
      .then(product => {
        return product.destroy();
      })
      .then(result => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
}

