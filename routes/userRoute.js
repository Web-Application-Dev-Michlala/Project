const express = require('express');
const router = express.Router();
const loginController=require('../controllers/loginController.js');
const userController=require('../controllers/userController.js');

router.route('/')
    .get(userController.getUserPage);


module.exports = router;