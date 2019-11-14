const Product = require('../models/product');
const Cart = require('../models/cart');

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

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            title: product.title,
            path: "/products",
            product: product
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

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    })
    
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.findById(id, product => {
        Cart.deleteProduct(id, product.price);
        res.redirect('/cart');
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