const express = require('express');
const router = express.Router();

const adminPageController = require('../controllers/adminPageController.js');

router.route('/adminPage/')
    .get(adminPageController.getAdminPage);

router.route('/adminPage/getCategorys')
    .get(adminPageController.getAllCategorys);

router.route('/adminPage/:categoryName')
    .delete(adminPageController.deleteCategory);

module.exports = router;
