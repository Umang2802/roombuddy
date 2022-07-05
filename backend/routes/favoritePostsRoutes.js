const express = require('express');
const router = express.Router();
const favoritePosts = require('../controllers/favoritePostsController');
const { verifyToken } = require('../middleware');

router.post('/addOrRemoveFavoritePost', verifyToken, favoritePosts.addOrRemoveFavoritePost);
router.get('/userFavoritePosts', verifyToken, favoritePosts.showUserFavoritePosts);
module.exports = router;