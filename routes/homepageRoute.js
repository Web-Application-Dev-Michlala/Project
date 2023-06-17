const express = require('express');
const router = express.Router();

const homepageController = require('../controllers/homepageController.js')

router.route('/')
    .get(homepageController.getHomePage)

router.route('/getCategorys')
    .get(homepageController.getAllCategorys)

router.route('/css')
    .get(homepageController.getHomePageCss)

router.route('/js')
    .get(homepageController.getHomePageJs)
   
router.route('/:id')
    .get(homepageController.getAllProductsByCategory)
    .put(homepageController.getCategoryByName)

    module.exports = router;
