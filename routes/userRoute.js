const express = require('express');
const router = express.Router();
const loginController=require('../controllers/loginController.js');
const userController=require('../controllers/userController.js');

router.route('/')
    .get(loginController.isLoggedIn,userController.getUserPage);

    router.route('/updateOrders') 
    .get(loginController.isLoggedIn,userController.updateOrders);
module.exports = router;