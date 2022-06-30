const roommateprofile = require("../models/rommateProfile");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { cloudinary } = require("../cloudinary/index");

module.exports.showAllRoommateProfiles = async (req, res) => {
  const profiles = await roommateprofile.find({});
  console.log(profiles);
  res.send(profiles);
}

module.exports.createRoommateProfile = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token");
    } else {
      const { name, age, gender, occupation, lookingForRoomIn, lookingToMoveIn, preferredSize, budget, preferences, image } = req.body;
      const userprofile = new roommateprofile({ name, age, gender, occupation, lookingForRoomIn, lookingToMoveIn, preferredSize, budget, preferences });
      
      userprofile.user = authData.user;

      const fileStr = image;
      const uploaded = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "roombuddy",
      });
      const roommateProfileImage = {
        url: uploaded.url,
        filename: uploaded.public_id,
      };
      userprofile.image = roommateProfileImage;

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
        const findProfile = await roommateprofile.findById(roommateProfileId);
        if(!findProfile){
          res.send("Roommate profile doesn't exist !");
        }
        else{
          await cloudinary.uploader.destroy(findProfile.image.filename);
          const deletedProfile = await roommateprofile.findByIdAndDelete(
            roommateProfileId
          );
          res.send(deletedProfile);
        }
      } else {
        res.send("You are not authorised to delete this roommate profile");
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
        image
      } = req.body;
      if (authData.user._id === userId) {

        const findProfile = await roommateprofile.findById(roommateProfileId);
        await cloudinary.uploader.destroy(findProfile.image.filename);

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

        const fileStr = image;
        const uploaded = await cloudinary.uploader.upload(fileStr, {
          upload_preset: "roombuddy",
        });
        const roommateProfileImage = {
          url: uploaded.url,
          filename: uploaded.public_id,
        };

        updatedProfile.image = roommateProfileImage;
        await updatedProfile.save();
        console.log(updatedProfile);
        res.send(updatedProfile);
      } else {
        res.send("You are not authorised to update this roommate profile");
      }
    }
  });
};
