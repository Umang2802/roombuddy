const StarredRoommateProfiles = require('../models/starredRoommate')
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


module.exports.addOrRemoveStarredRoommateProfile = async (req, res) => {
    jwt.verify(req.token, "mysecretkey", async (err, authData) => {
        if (err) {
            res.send("error while verifying token in addOrRemoveStarredRoommateProfile");
        }
        else{
            const { roommateId } = req.body;
            const existingRecord = await StarredRoommateProfiles.findOne({ user: authData.user._id });
            if(existingRecord){
                let found = false;
                for(let i = 0; i < existingRecord.roommates.length; i++){
                    if(existingRecord.roommates[i].toString() === roommateId){
                        found = true;
                        existingRecord.roommates.splice(i, 1);
                        await existingRecord.save();
                        res.send(existingRecord);
                        break;
                    }
                }
                if(found === false){
                    existingRecord.roommates.push(roommateId);
                    await existingRecord.save();
                    res.send(existingRecord);
                }   
            }
            else{
                const newStarredProfile = new StarredRoommateProfiles({
                    user: authData.user._id
                });
                newStarredProfile.roommates.push(roommateId);
                await newStarredProfile.save();
                res.send(newStarredProfile);
            }  
        }
    });
}

module.exports.userStarredRoommateProfiles = async (req, res) => {
    jwt.verify(req.token, "mysecretkey", async (err, authData) => {
        const userStarredRoommateProfiles = await StarredRoommateProfiles.findOne({ user: authData.user._id });
        if(userStarredRoommateProfiles){
            if(userStarredRoommateProfiles.roommates.length === 0){
                res.send("You have no Starred Roommate Profiles listed !");
            }
            else{
                res.send(userStarredRoommateProfiles);
            }
        }
        else{
            res.send("You have no Starred Roommate Profiles listed !");
        }
    });
}