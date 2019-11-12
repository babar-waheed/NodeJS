
const products = [];

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
    products.push({
        title: req.body.title
    })
    res.redirect('/');
}

exports.getShop = (req, res, next) => {
    //res.sendFile(path.join(rootDir ,'views', 'shop.html'));\
    res.render('shop', {
        prods: products, 
        title: 'My Shop',  
        path: "/", 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}