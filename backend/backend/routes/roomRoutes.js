const express = require('express');
//const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const rooms = require('../controllers/roomController');
const { validateRoom , verifyToken} = require('../middleware');

router.get('/', verifyToken ,rooms.index);
router.get('/:id', verifyToken ,rooms.showRoom);
router.post('/', verifyToken , validateRoom ,rooms.createRoom);

//todo edit and delete


/* function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.send("Forbidden");
    }
} */

module.exports = router;