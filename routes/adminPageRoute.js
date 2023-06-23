const express = require('express');
const router = express.Router();

const adminPageController = require('../controllers/adminPageController.js');

router.route('/adminPage/')
    .get(adminPageController.getAdminPage);

router.route('/getCategorys')
    .get(adminPageController.getAllCategorys);

router.route('/:categoryName')
    .delete(adminPageController.deleteCategory);

router.route('/getCategoryDetails/:categoryName')
    .get(adminPageController.getCategoryDetails);

module.exports = router;
