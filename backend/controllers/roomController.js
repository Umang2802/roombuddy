const Room = require("../models/room");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { cloudinary } = require("../cloudinary/index");
const similarity = require("compute-cosine-similarity");

module.exports.index = async (req, res) => {
    const rooms = await Room.find({}).populate("user", "username imageURL");
    res.send(rooms);
};

module.exports.createRoom = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in create room");
    } else {
      try {
        const {
          name,
          address,
          description,
          bhk,
          bathroom,
          propertyType,
          smoking,
          alcohol,
          pets,
          vegetarian,
          noOfTenants,
          amenities,
          preferences,
          rentPrice,
          tenantDetails,
          images,
          coordinates,
          total_sqft
        } = req.body;
        const room = new Room({
          name,
          address,
          description,
          bhk,
          bathroom,
          propertyType,
          smoking,
          alcohol,
          pets,
          vegetarian,
          noOfTenants,
          amenities,
          preferences,
          rentPrice,
          tenantDetails,
          coordinates,
          total_sqft
        });

        room.user = authData.user;

        for (let i = 0; i < images.length; i++) {
          const fileStr = images[i];

          const uploaded = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "roombuddy",
          });
          const roomImage = {
            url: uploaded.secure_url,
            filename: uploaded.public_id,
          };
          room.images.push(roomImage);
        }

        await room.save();
        console.log(room);
        res.send(room);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

module.exports.showRoom = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in show room");
    } else {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const room = await Room.findById(req.params.id);
        if (!room) {
          res.send("Room not listed");
        } else {
          console.log(room);
          res.send(room);
        }
      } else {
        res.send("Not a valid roomId");
      }
    }
  });
};

module.exports.deleteRoom = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in deleteRoom");
    } else {
      const { roomId, userId } = req.body;

      if (authData.user._id === userId) {
        const room = await Room.findById(roomId);
        if (!room) {
          res.send("Room not listed");
        } else {
          for (let i = 0; i < room.images.length; i++) {
            await cloudinary.uploader.destroy(room.images[i].filename);
          }
          const deletedRoom = await Room.findByIdAndDelete(room._id);
          console.log("Deleted Room : " + deletedRoom);
          res.send(deletedRoom);
        }
      } else {
        res.send("You are not authorised to delete this room !");
      }
    }
  });
};

module.exports.updateRoom = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in updateRoom");
    } else {
      const {
        name,
        address,
        description,
        bhk,
        bathroom,
        propertyType,
        smoking,
        alcohol,
        pets,
        vegetarian,
        noOfTenants,
        amenities,
        preferences,
        rentPrice,
        tenantDetails,
        images,
        roomId,
        userId,
        coordinates,
        total_sqft
      } = req.body;

      if (authData.user._id === userId) {
        const r = await Room.findById(roomId);
        const deletedImages = [];

        for (let j = 0; j < r.images.length; j++) {
          deletedImages.push(r.images[j].filename);
        }

        await console.log("deletedImages : " + deletedImages);

        const room = await Room.findByIdAndUpdate(
          roomId,
          {
            name,
            address,
            description,
            bhk,
            bathroom,
            propertyType,
            smoking,
            alcohol,
            pets,
            vegetarian,
            noOfTenants,
            amenities,
            preferences,
            rentPrice,
            tenantDetails,
            coordinates,
            total_sqft
          },
          { new: true }
        );

        room.user = userId;
        room.images = [];

        for (let i = 0; i < images.length; i++) {
          const fileStr = images[i];

          const uploaded = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "roombuddy",
          });
          const roomImage = {
            url: uploaded.secure_url,
            filename: uploaded.public_id,
          };
          room.images.push(roomImage);
        }

        await room.save();
        //now delete old images from cloudinary
        for (let i = 0; i < deletedImages.length; i++) {
          await cloudinary.uploader.destroy(deletedImages[i]);
        }

        console.log(room);
        res.send(room);
      } else {
        res.send("You are not authorised to update this room");
      }
    }
  });
};

module.exports.reportRoom = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in reportRoom");
    } else {
      const { roomId, msg } = req.body;
      const room = await Room.findById(roomId);
      if (room.reports.length !== 0) {
        let flag = false;
        for (let i = 0; i < room.reports.length; i++) {
          console.log("entered for");
          console.log("roomuser" + [i], JSON.stringify(room.reports[i].user));

          console.log("authdata" + [i], JSON.stringify(authData.user._id));
          console.log("");
          if (
            JSON.stringify(room.reports[i].user) ===
            JSON.stringify(authData.user._id)
          ) {
            console.log("entered if");
            flag = true;
            res.send("Already Reported!");
            return;
          }
        }
        if (flag === false) {
          const roomReport = {
            user: authData.user,
            message: msg,
          };
          room.reports.push(roomReport);
          await room.save();
        }
      } else {
        const roomReport = {
          user: authData.user,
          message: msg,
        };
        room.reports.push(roomReport);
        await room.save();
      }
      res.send(room);
    }
  });
};

module.exports.roomRecommender = async (req, res) => {
  const { roomIDs, response } = req.body;
  if (response.length === 0) {
    res.send("Response field is empty"); //after getting this reponse, automatically route to survey from frontend
  }
  else{
    const sortedRooms = [];
    const foundRooms = [];
    for (let i = 0; i < roomIDs.length; i++) {
      const room = await Room.findOne({
        _id: roomIDs[i]
      });
      foundRooms.push(room);
    }

    for (let i = 0; i < foundRooms.length; i++) {
      let total_sqft = foundRooms[i].total_sqft
      let bathroom = foundRooms[i].bathroom
      let bhk = foundRooms[i].bhk
      let coord1 = foundRooms[i].coordinates[0]
      let coord2 = foundRooms[i].coordinates[1]

      let currentRoomValues = [total_sqft, bathroom, bhk, coord1, coord2]
      let cosine = similarity(response, currentRoomValues);

      let roomAndCosine = {
        room: foundRooms[i],
        cosine: cosine
      };

      sortedRooms.push(roomAndCosine);
    }
    sortedRooms.sort((a, b) => (a.cosine > b.cosine ? 1 : -1));
    res.send(sortedRooms)
  }

}