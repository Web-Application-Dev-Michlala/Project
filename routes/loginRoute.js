const express = require('express');
const router = express.Router();
const loginController=require('../controllers/loginController');

router.route('/')
    .get(loginController.getLoginPage)
    .post(loginController.login)

router.route('/logout')
.get(loginController.logout);


 module.exports = router;