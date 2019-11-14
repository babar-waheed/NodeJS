const Product = require('../models/product');
//const Cart = require('../models/cart');

//Shop Navigation Item
exports.getIndex = (req, res, next) => {

    Product.findAll()
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

    Product.findAll()
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
    Product.findAll({where: {id: id}})
    .then(products => {
        console.log("getProduct() Product Detials Inner Page ***" + products);
        res.render('shop/product-detail', {
            title: products[0].title,
            path: "/products",
            product: products[0]
        });
    })
    .catch(err => {
        console.log(err);
    })
}

//TODO
exports.getCart = (req, res, next) => {
   Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                
                console.log("cartProductData", cartProductData);

                if(cartProductData){
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                title: 'Your Cart',  
                path: "/cart", 
                products: cartProducts
            })
        })   
   });
    
}

//TODO
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    })
    
    res.redirect('/cart');
}

//TODO
exports.postCartDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id, product => {
        Cart.deleteProduct(id, product.price);
        res.redirect('/cart');
    })
    
}

//TODO
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        title: 'Your Orders',  
        path: "/orders", 
    })
}

//TODO
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        title: 'Checkout',  
        path: "/cart", 
    })
}