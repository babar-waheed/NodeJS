const Product = require('../models/product');
const Order = require('../models/order');

//Shop Navigation Item
exports.getIndex = (req, res, next) => {

    Product.find()
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

    Product.find()
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

    req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log("CONTOLLER [SHOP]: getCart()", user.cart.items)
            let products = user.cart.items;
            res.render('shop/cart', { 
                title: 'Your Cart',  
                path: "/cart", 
                products: products
            })    
        }) 

    let products = req.user.cart.items;
    
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
    
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          username: req.user.username,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

//Get orders for order page
exports.getOrders = (req, res, next) => {

    Order.find({'user.userId': req.user._id})
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
