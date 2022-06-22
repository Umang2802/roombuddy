const express = require('express');
const router = express.Router();
const roommateprofile =  require('../controllers/roommateProfileController');
//const catchAsync = require('../utils/catchAsync');
const { validateRoommateProfile, verifyToken } = require('../middleware');

router.get('/', roommateprofile.showAllRoommateProfiles);
router.get('/:userId', verifyToken, roommateprofile.showRoommateProfile);
router.post('/', verifyToken, validateRoommateProfile, roommateprofile.createRoommateProfile);
router.post('/deleteRoommateProfile', verifyToken, roommateprofile.deleteRoommateProfile);
router.post('/updateRoommateProfile', verifyToken, roommateprofile.updateRoommateProfile);

module.exports = router;