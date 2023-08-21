const express = require('express');
const router = express.Router();


const adminPageController = require('../controllers/adminPageController.js');
const loginController=require('../controllers/loginController.js');

router.route('/')
    .get(loginController.isAdmin,adminPageController.getAdminPage2);


router.route('/getCategorys')
    .get(adminPageController.getAllCategorys);

router.route('/getAllImages')
    .get(adminPageController.getAllImages);



    

//---------------------------------------------------------->
router.route('/topUsers')
.get(adminPageController.getTopUsersWithOrderCounts)
router.route('/profile')
.get( adminPageController.getUserProfile);
router.route('/orders')
.get( adminPageController.getAllOrdersByUserName);
router.route('/allOrders')
.get( adminPageController.getAllOrders);
router.route('/users')
.get( adminPageController.getAllUsernames);
//router.route('/changePassword')
//.post( adminPageController.changePassword);
router.route('/changePassword')
.post(adminPageController.changePassword);

//--------------------------------------------------------->

router.route('/isCategoryExist/:categoryName')
    .get(adminPageController.isCategoryExist);

router.route('/createCategory')
    .post(adminPageController.createCategory);

router.route('/createProduct')
    .post(adminPageController.createProduct);

router.route('/deleteProduct')
    .delete(adminPageController.deleteProduct);

router.route('/updateCategory/:categoryName')
    .post(adminPageController.updateCategory);

router.route('/updateProduct/:categoryName/:id')
    .post(adminPageController.updateProduct);

router.route('/addProductAmount/:id')
    .post(adminPageController.addProductAmount);

router.route('/:categoryName')
    .delete(adminPageController.deleteCategory)
    .get(adminPageController.getCategoryByName);

router.route('/getCategoryDetails/:categoryName')
    .get(adminPageController.getCategoryDetails);

router.route('/:categoryName/:id')
    .get(adminPageController.getProductById);

router.route('/:id')
    //.post(adminPageController.createProduct);



  
module.exports = router;
