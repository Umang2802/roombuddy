const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const { verifyToken } = require('../middleware');
//const catchAsync = require('../utils/catchAsync');

router.post('/signup', user.signUp);
router.post('/login', user.login);
router.post('/survey', verifyToken ,user.survey);
router.post('/personality', verifyToken ,user.personality);

module.exports = router;