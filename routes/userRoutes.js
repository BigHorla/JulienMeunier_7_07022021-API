const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

//Signup
router.post('/signup', userCtrl.signup);

//Login
router.post('/login', userCtrl.login);

module.exports = router;