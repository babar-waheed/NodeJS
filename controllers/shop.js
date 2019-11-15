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

//View Cart
exports.getCart = (req, res, next) => {
    
    req.user.getCart()
    .then(cart => {
        return cart.getProducts();    
    })
    .then(products => {
        res.render('shop/cart', {
            title: 'Your Cart',  
            path: "/cart", 
            products: products
        })
    })
    .catch(err => {
        console.log(err);
    })       
}

//Post to cart.
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
    
}

//Delete product in the cart
exports.postCartDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    user.req
    .getCart()
    .then(cart => {
        return cart.getProducts({where: {id : id}})
    })
    .then(products => {
        const product = products[0];
        product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
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