const express = require('express');
const router = express.Router();


//const productPageController = require('../controllers/productPageController.js');
const productListController = require('../controllers/productsListController.js');



router.route('/:categoryName/:id')
    .get(productListController.getProductById);


module.exports = router;