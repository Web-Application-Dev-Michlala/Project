const express = require('express');
const router = express.Router();
const registerController=require('../controllers/registerController');
const loginController=require('../controllers/loginController');


router.route('/')
    .get(loginController.isntLoggedInNav,registerController.getRegisterPage)
   .post(registerController.register)



   module.exports = router;