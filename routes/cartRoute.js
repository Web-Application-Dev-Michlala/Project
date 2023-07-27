const express = require('express');
const router = express.Router();
const loginController=require('../controllers/loginController.js');
const cartController=require('../controllers/cartController.js');

router.route('/')
    .get(loginController.isLoggedIn,cartController.getCartPage);

module.exports = router;