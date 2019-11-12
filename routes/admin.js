//const path = require('path');
const express = require('express');
//const rootDir = require('../utils/path');
const proudctController = require('../controllers/products');
const router = express.Router();

router.get('/add-product', proudctController.getAddProduct);

router.post('/add-product', proudctController.postAddProudct);

module.exports = router;