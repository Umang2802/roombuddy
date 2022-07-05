const express = require('express');
const router = express.Router();
const starredRoommateProfiles = require('../controllers/starredRoommateController');
const { verifyToken } = require('../middleware');

router.post('/addOrRemoveStarredRoommateProfile', verifyToken, starredRoommateProfiles.addOrRemoveStarredRoommateProfile);
router.get('/userStarredRoommateProfiles', verifyToken, starredRoommateProfiles.userStarredRoommateProfiles);
module.exports = router;