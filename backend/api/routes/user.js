const express = require('express');

const User = require('../model/user.model');
const userController = require('../controllers/user');
const router = express.Router();

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);


module.exports = router;