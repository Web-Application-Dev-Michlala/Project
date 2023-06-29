const express = require('express');
const router = express.Router();


const adminPageController = require('../controllers/adminPageController.js');
const loginController=require('../controllers/loginController.js');

router.route('/')
    .get(loginController.isAdmin,adminPageController.getAdminPage2);


router.route('/getCategorys')
    .get(adminPageController.getAllCategorys);



    

//---------------------------------------------------------->
router.route('/profile')
.get( adminPageController.getUserProfile);
router.route('/users')
.get( adminPageController.getAllUsernames);
router.route('/orders')
.get( adminPageController.getAllOrders);
//--------------------------------------------------------->
router.route('/:categoryName')
    .delete(adminPageController.deleteCategory)
    .get(adminPageController.getCategoryByName)
    .post(adminPageController.createCategory)

router.route('/getCategoryDetails/:categoryName')
    .get(adminPageController.getCategoryDetails);

router.route('/:categoryName/:id')
    .get(adminPageController.getProductById);

router.route('/:id')
    //.post(adminPageController.createProduct);



  
module.exports = router;
