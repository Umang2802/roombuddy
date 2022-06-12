const { roomSchema } = require('./schemas');
const { userProfileSchema } = require('./schemas');
const Room = require('./models/room');



module.exports.validateUserProfile = (req, res, next) => {
    const { error } = userProfileSchema.validate(req.body);
    if(error){
        res.send("JOI validation error for user profile");
    }
    else {
        next();    
    }
}

module.exports.verifyToken = (req, res, next) => {
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
}