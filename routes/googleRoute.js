const express = require('express');
const router = express.Router();

const googleController = require('../controllers/googleController.js')

router.route('/')
    .get(googleController.getKey)

module.exports = router;