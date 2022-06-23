const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
//const catchAsync = require('../utils/catchAsync');

router.post('/signup', user.signUp);
router.post('/login', user.login);

module.exports = router;