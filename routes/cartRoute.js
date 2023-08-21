const express = require('express');
const router = express.Router();
const loginController=require('../controllers/loginController.js');
const cartController=require('../controllers/cartController.js');

router.route('/')
    .get(loginController.isLoggedIn,cartController.getCartPage);

router.route('/validate')
    .post(loginController.isLoggedIn,cartController.validateItem)

router.route('/purchaseValidate')
    .post(loginController.isLoggedIn,cartController.validateAll)
router.route('/removeItems')
    .post(loginController.isLoggedIn,cartController.removeItems)
router.route('/getRates')
    .get(loginController.isLoggedIn,cartController.getRates)







module.exports = router;