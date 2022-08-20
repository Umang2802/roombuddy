const User = require("../models/user");
const RoommateProfile = require("../models/rommateProfile");
const bcrypt = require("bcryptjs");

const similarity = require("compute-cosine-similarity");

const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  const { username, email, password, imageURL, bio, type } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.send("Account already exists");
  } else {
    const user = new User({
      username,
      email,
      password,
      imageURL,
      bio,
      type,
    });

    await user.save();
    console.log("Sign Up successfull !");
    console.log(user);

    jwt.sign({ user: user }, "mysecretkey", (err, token) => {
      res.send({ token: token, user: user });
    });
    //res.send(user);
  }
};

module.exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password, type } = req.body;
  if (type === "googlelogin") {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      jwt.sign({ user: checkUser }, "mysecretkey", (err, token) => {
        res.send({ token: token, user: checkUser });
      });
    } else {
      res.send("Incorrect email");
    }
  } else if (type === "normallogin") {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      const passwordEnteredByUser = password;
      const hash = checkUser.password;

      bcrypt.compare(passwordEnteredByUser, hash, function (error, isMatch) {
        if (error) {
          throw error;
        } else if (!isMatch) {
          res.send("Password doesn't match!");
        } else {
          console.log("Password matches!, Sign In successful !");

          jwt.sign({ user: checkUser }, "mysecretkey", (err, token) => {
            res.send({ token: token, user: checkUser });
          });
        }
      });
    } else {
      res.send("Incorrect email");
    }
  }
};

module.exports.survey = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in survey");
    } else {
      const { response, user_id } = req.body;
      console.log(response);
      const user = await User.findOneAndUpdate(
        { _id: user_id },
        { response: response },
        { new: true }
      );
      console.log(user);
      res.send(user);
    }

  });
};

module.exports.personality = async (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, authData) => {
    if (err) {
      res.send("error while verifying token in personality");
    } else {
      const { roommateIDs, response } = req.body;
      // const response = authData.user.response;
      console.log(response);
      console.log(roommateIDs);
      if (response.length === 0) {
        res.send("Response field is empty"); //after getting this reponse, automatically route to survey from frontend
      } else {
        const sortedIDs = [];
        const foundUsers = [];
        for (let i = 0; i < roommateIDs.length; i++) {
          const user = await RoommateProfile.findOne({
            _id: roommateIDs[i],
          }).populate("user"); // check if populate works properly

          foundUsers.push(user);
        }

        for (let i = 0; i < foundUsers.length; i++) {
          let cosine = similarity(response, foundUsers[i].user.response);
          // let userAndCosine = foundUsers[i];
          let userAndCosine = {
            Roommateprofile: foundUsers[i],
            cosine: cosine,
          };
          // userAndCosine.cosine = cosine;
          console.log("usercosine", userAndCosine);
          sortedIDs.push(userAndCosine);
        }

        sortedIDs.sort((a, b) => (a.cosine > b.cosine ? 1 : -1));
        res.send(sortedIDs);
      }
    }
  });
};
