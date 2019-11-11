const express = require('express');
const shopRouter = express.Router();

shopRouter.get('/', (req, res, next) => {
    res.send(`
    <h1>Home Page</h1>
    <a href="/admin/add-product">Add Product</a>
    
    `);
});

module.exports = shopRouter;