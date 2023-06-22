const express = require('express');
const router = express.Router();

const productsListController = require('../controllers/productsListController.js')
const homepageController=require('../controllers/homepageController.js')

router.route('/category')
.get((req, res) => {
    res.sendFile('productsList.html', { root: 'public/ProductsList' });
  });
router.route('/products')
    .get(productsListController.getProuductsListPage)
router.route('/category/:name')
    .get(productsListController.getProductsByName)
// router.route('/:category')
//     .get(homepageController.getAllProductsByCategory)
router.route('/:id')
    .get(productsListController.getProductById)




router.route('/:category/:min/:max')
    .get(productsListController.getProductsByPriceRange)

router.route('/:category/:colors')
    .get(productsListController.getProductsByColors)

router.route('/:category/:sizes')
    .get(productsListController.getProductsBySizes)



module.exports = router;
