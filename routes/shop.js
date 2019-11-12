const express = require('express');
const shopRouter = express.Router();
const path = require('path');
const rootDir = require('../utils/path');
const adminData = require('../routes/admin');

shopRouter.get('/', (req, res, next) => {
    const products = adminData.products;
    //res.sendFile(path.join(rootDir ,'views', 'shop.html'));\
    res.render('shop', {
        prods: products, 
        title: 'My Shop',  
        path: "/", 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = shopRouter;