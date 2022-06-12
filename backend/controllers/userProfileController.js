const Userprofile = require('../models/userProfile');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports.createUserProfile = async (req, res) => {
    jwt.verify(req.token, 'mysecretkey', async (err, authData) => {
        if(err){
            res.send("error while verifying token");
        }
        else{
           const userprofile = new Userprofile(req.body);
           userprofile.user = authData.user;
           await userprofile.save();
           console.log(userprofile);
           res.send(userprofile);
        }
    });
}
module.exports.showUserProfile = async (req, res) => {
    jwt.verify(req.token, 'mysecretkey', async (err, authData) => {
        if(err){
            res.send("error while verifying token");
        }
        else{   
                if(mongoose.Types.ObjectId.isValid(req.params.userId)){
                    const userprofile = await Userprofile.findOne({user: req.params.userId});
                    if(!userprofile){
                        res.send("User profile not listed");
                    }
                    else{
                        res.send(userprofile);
                    }
                }
                else{
                    res.send("Not a valid userId")
                }
                
        }
    });
}
