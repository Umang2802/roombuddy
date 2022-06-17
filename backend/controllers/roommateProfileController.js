const roommateprofile = require("../models/rommateProfile");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



module.exports.createRoommateProfile = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token");
    } else {
      const userprofile = new roommateprofile(req.body);
      userprofile.user = authData.user;
      await userprofile.save();
      console.log(userprofile);
      res.send(userprofile);
    }
  });
};
module.exports.showRoommateProfile = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in showRoommateProfile");
    } else {
      if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        const userprofile = await roommateprofile.findOne({
          user: req.params.userId,
        });
        if (!userprofile) {
          res.send("User profile not listed");
        } else {
          res.send(userprofile);
        }
      } else {
        res.send("Not a valid userId");
      }
    }
  });
};

module.exports.deleteRoommateProfile = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in deleteRoommateProfile");
    } else {
      const { userId, roommateProfileId } = req.body;
      if (authData.user._id === userId) {
        const deletedProfile = await roommateprofile.findByIdAndDelete(
          roommateProfileId
        );
        res.send(deletedProfile);
      } else {
        res.send("You are not authorised to delete this roomate profile");
      }
    }
  });
};

module.exports.updateRoommateProfile = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in updateRoommateProfile");
    } else {
      const {
        userId,
        roommateProfileId,
        name,
        age,
        gender,
        occupation,
        lookingForRoomIn,
        lookingToMoveIn,
        preferredSize,
        budget,
        preferences,
      } = req.body;
      if (authData.user._id === userId) {
        const updatedProfile = await roommateprofile.findByIdAndUpdate(
          roommateProfileId,
          {
            name,
            age,
            gender,
            occupation,
            lookingForRoomIn,
            lookingToMoveIn,
            preferredSize,
            budget,
            preferences,
          },
          { new: true }
        );

        console.log(updatedProfile);
        res.send(updatedProfile);
      } else {
        res.send("You are not authorised to update this roomate profile");
      }
    }
  });
};
