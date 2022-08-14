const FavoritePosts = require("../models/favoritePosts");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.addOrRemoveFavoritePost = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in addOrRemoveFavoritePost");
    } else {
      const { roomId } = req.body;
      const existingRecord = await FavoritePosts.findOne({
        user: authData.user._id,
      });
      if (existingRecord) {
        let found = false;
        for (let i = 0; i < existingRecord.posts.length; i++) {
          if (existingRecord.posts[i].toString() === roomId) {
            found = true;
            existingRecord.posts.splice(i, 1);
            await existingRecord.save();
            res.send(existingRecord);
            break;
          }
        }
        if (found === false) {
          existingRecord.posts.push(roomId);
          await existingRecord.save();
          res.send(existingRecord);
        }
      } else {
        const newFavoritePost = new FavoritePosts({
          user: authData.user._id,
        });
        newFavoritePost.posts.push(roomId);
        await newFavoritePost.save();
        res.send(newFavoritePost);
      }
    }
  });
};

module.exports.showUserFavoritePosts = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    const userFavoritePosts = await FavoritePosts.findOne({
      user: authData.user._id,
    });
    if (userFavoritePosts) {
      if (userFavoritePosts.posts.length === 0) {
        res.send("You have no favorite posts listed !");
      } else {
        res.send(userFavoritePosts);
      }
    } else {
      res.send("You have no favorite posts listed !");
    }
  });
};
