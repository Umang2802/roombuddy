const Room = require("../models/room");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { cloudinary } = require("../cloudinary/index");

module.exports.index = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token");
    } else {
      const rooms = await Room.find({});
      res.send(rooms);
    }
  });
};

module.exports.createRoom = async (req, res) => {
  //res.send(room);

  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token");
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
        });

        room.user = authData.user;
        console.log(name);
        console.log(images);
        for (let i = 0; i < images.length; i++) {
          console.log("item", images[i]);
          const fileStr = images[i];
          console.log(fileStr);
          const uploaded = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "roombuddy",
          });
          const roomImage = {
            url: uploaded.url,
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
      res.send("error while verifying token");
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
