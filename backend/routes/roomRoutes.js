const express = require('express');
//const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const rooms = require('../controllers/roomController');
const { verifyToken, validateRoom} = require('../middleware');

router.get('/', verifyToken ,rooms.index);
router.get('/:id', verifyToken ,rooms.showRoom);
router.post('/', verifyToken, validateRoom, rooms.createRoom);
router.post('/deleteRoom', verifyToken, rooms.deleteRoom);








module.exports = router;