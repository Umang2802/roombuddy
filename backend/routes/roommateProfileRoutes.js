const express = require('express');
const router = express.Router();
const roommateprofile =  require('../controllers/roommateProfileController');
const { validateRoommateProfile, verifyToken } = require('../middleware');

router.get('/:userId', verifyToken, roommateprofile.showRoommateProfile);
router.post('/', verifyToken, validateRoommateProfile, roommateprofile.createRoommateProfile);

module.exports = router;