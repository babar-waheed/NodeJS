const express = require('express');
const router = express.Router();
// const path = require('path');
// const rootDir = require('../utils/path');
// const adminData = require('../routes/admin');
const proudctController = require('../controllers/products');

router.get('/', proudctController.getShop);

module.exports = router;