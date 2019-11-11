const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/add-product', (req, res, next) => {
    res.send(
        `<html>
            <head><title>Product Page</title></head>
            <body>
                <form method="post" action="/product">
                    <input type="text" name="title" />
                    <input type="submit" value="Add Product">
                </form>
            </body>
        </html>    
        `
    );
});

adminRouter.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = adminRouter;