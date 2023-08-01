const express = require('express');
const router = express.Router();

const productsListController = require('../controllers/productsListController.js')


router.route('/')
.get(productsListController.getProuductsListPage)

//router.route('/products')
//    .get(productsListController.getProuductsListPage)

//router.route('/:category/:name')
//    .get(productsListController.getProuductsListPage)

router.route('/getCurrentCategory')
    .get(productsListController.getCurrentCategory)

router.route('/getAllProductsByCategory/:categoryName')
    .get(productsListController.getAllProductsByCategory)
    
router.route('/getProductById/:categoryName/:id')
    .get(productsListController.getProductById)

router.route('/getProductsByName/:categoryName/:name')
    .get(productsListController.getProductsByName)

router.route('/getProductsByPriceRange/:categoryName/:priceRange')
    .get(productsListController.getProductsByPriceRange)

router.route('/getProductsByColors/:categoryName/:colors')
    .get(productsListController.getProductsByColors)

router.route('/getProductsBySizes/:categoryName/:sizes')
    .get(productsListController.getProductsBySizes)

router.route('/getProductsByBrands/:categoryName/:brands')
    .get(productsListController.getProductsByBrands)

router.route('/getProductsByColorsSizesBrands/:categoryName/:colors/:sizes/:brands')
    .get(productsListController.getProductsByColorsSizesBrands);

router.route('/getProductsByColorsBrandsPriceRange/:categoryName/:colors/:brands/:priceRange')
    .get(productsListController.getProductsByColorsBrandsPriceRange);


module.exports = router;
