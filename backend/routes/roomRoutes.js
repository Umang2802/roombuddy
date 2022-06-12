const express = require('express');
//const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const rooms = require('../controllers/roomController');
const { verifyToken, validateRoom} = require('../middleware');

/* const multer = require('multer'); */
/* const { storage } = require('../cloudinary/index');
const upload = multer({ storage }); */

router.get('/', verifyToken ,rooms.index);
router.get('/:id', verifyToken ,rooms.showRoom);
router.post('/', verifyToken, validateRoom, rooms.createRoom);

/* router.post('/', upload.array('images'), (req, res) => {
    console.log(req.body, req.files);
    console.log();

    res.send("It worked");
}) */



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