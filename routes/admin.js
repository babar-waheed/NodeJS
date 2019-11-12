const path = require('path');
const express = require('express');
const rootDir = require('../utils/path');

const adminRouter = express.Router();

const products = [];

adminRouter.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', {
        title: "Add Products!", 
        path: "/admin/add-product",
        formCSS: true,
        productCSS: true,
        activeAddProduct: true    
    })
});

adminRouter.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({
        title: req.body.title
    })
    res.redirect('/');
})

exports.routes = adminRouter;
exports.products = products;