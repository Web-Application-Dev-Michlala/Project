const express = require('express');
const router = express.Router();
const registerController=require('../controllers/registerController');


router.route('/')
    .get(registerController.getRegisterPage)
   .post(registerController.register)



   module.exports = router;