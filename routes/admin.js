//const path = require('path');
const express = require('express');
//const rootDir = require('../utils/path');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.post('/add-product', adminController.postAddProudct);
router.get('/edit-product/:productId', adminController.getEditProduct); 
router.post('/edit-product', adminController.postEditProudct);
router.post('/delete-product', adminController.postDeleteProudct);
module.exports = router;