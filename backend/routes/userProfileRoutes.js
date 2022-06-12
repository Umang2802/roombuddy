const express = require('express');
const router = express.Router();
const Userprofile =  require('../controllers/userProfileController');
const { validateUserProfile, verifyToken } = require('../middleware');

router.get('/:userId', verifyToken, Userprofile.showUserProfile);
router.post('/', verifyToken, validateUserProfile, Userprofile.createUserProfile);

module.exports = router;