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
.get(loginController.isAdmin,adminPageController.getTopUsersWithOrderCounts)
router.route('/profile')
.get( loginController.isLoggedIn,adminPageController.getUserProfile);
router.route('/orders')
.get( loginController.isLoggedIn,adminPageController.getAllOrdersByUserName);
router.route('/allOrders')
.get( loginController.isAdmin,adminPageController.getAllOrders);
router.route('/users')
.get( loginController.isAdmin,adminPageController.getAllUsernames);
router.route('/facebookPost')
    .post(loginController.isAdmin,adminPageController.facebookPost)
router.route('/changePassword').post(loginController.isLoggedIn,adminPageController.changePassword);
router.route('/ChangeProfile').post(loginController.isLoggedIn,adminPageController.ChangeProfile,loginController.logout);


//--------------------------------------------------------->

router.route('/isCategoryExist/:categoryName')
    .get(loginController.isAdmin,adminPageController.isCategoryExist);

router.route('/isProductExistCreate/:Id/:name')
    .get(loginController.isAdmin,adminPageController.isProductExistCreate);

router.route('/isProductExistUpdate/:Id/:name')
    .post(loginController.isAdmin,adminPageController.isProductExistUpdate);

router.route('/createCategory')
    .post(loginController.isAdmin,adminPageController.createCategory);

router.route('/createProduct')
    .post(loginController.isAdmin,adminPageController.createProduct);

router.route('/deleteProduct')
    .delete(loginController.isAdmin,adminPageController.deleteProduct);

router.route('/updateCategory/:categoryName')
    .post(loginController.isAdmin,adminPageController.updateCategory);

router.route('/updateProduct/:categoryName/:id')
    .post(loginController.isAdmin,adminPageController.updateProduct);

router.route('/addProductAmount/:id')
    .post(loginController.isAdmin,adminPageController.addProductAmount);

router.route('/:categoryName')
    .delete(loginController.isAdmin,adminPageController.deleteCategory)
    .get(adminPageController.getCategoryByName);

router.route('/getCategoryDetails/:categoryName')
    .get(loginController.isAdmin,adminPageController.getCategoryDetails);

router.route('/:categoryName/:id')
    .get(loginController.isAdmin,adminPageController.getProductById);

router.route('/:id')
    //.post(adminPageController.createProduct);



  
module.exports = router;
