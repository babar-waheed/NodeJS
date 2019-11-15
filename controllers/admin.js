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
    
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.desc;
    const imageUrl = req.body.url;

    const product = new Product(title, price, description, imageUrl, null, req.user._id);

    product
        .save()
        .then(result => { 
            console.log("CONTROLLER: postAddProudct()", result)
            res.redirect('/admin/products');
        })
        .catch(err => {console.log("CONTROLLER: postAddProudct()", err)})

}

//Edit Product CTA
exports.getEditProduct = (req, res, next) => {
    
    const editMode = req.query.edit;
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product =>{
            console.log("CONTROLLER: getEditProduct()", product);
            res.render('admin/edit-product', {
                title: "Edit Products!", 
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            })
        })
        .catch(err => {
            console.log(err);
        })
}

// //Admin Proudcts.
exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            console.log("CONTROLLER: getProducts()", products);
            res.render('admin/products', {
                prods: products, 
                title: 'Admin Products',  
                path: "/admin/products", 
            });
        })
        .catch(err => {
            console.log("CONTROLLER: getProducts()", err);
        })
}

// //Edit Proudct Update Query
exports.postEditProudct = (req, res, next) => {

    const id = req.body.id;
    const title = req.body.title;
    const image = req.body.url;
    const price = req.body.price;
    const desc = req.body.desc;

    Product.findById(id)
        .then(product => {
            const ProductInstance = new Product(title, price, desc, image, id)
            ProductInstance.save();
        })
        .then(result => {
            console.log("CONTROLLER: postEditProduct()", "Updated....");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

// //Delete Product
exports.postDeleteProudct = (req, res, next) => {
    const prodId = req.body.id;
    
    Product.deleteById(prodId)
      .then(() => {
        console.log('CONTROLLER: postDeleteProudct', "DELETED!!!!!!");
        res.redirect('/admin/products');
      })
      .catch(err => console.log(err));
}

