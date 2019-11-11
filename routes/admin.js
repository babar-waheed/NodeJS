const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/add-product', (req, res, next) => {
    res.send(
        `<html>
            <head><title>Product Page</title></head>
            <body>
                <form method="post" action="/admin/add-product">
                    <input type="text" name="title" />
                    <input type="submit" value="Add Product">
                </form>
            </body>
        </html>    
        `
    );
});

adminRouter.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = adminRouter;