const User = require('../models/user');
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
   const {username, email, password} = req.body;
   const checkUser = await User.findOne({ email });
   if(checkUser){
     res.send("Account already exists")
   }
   else{
    const user = new User({
      username, 
      email,
      password
    });

    await user.save();
    console.log("Sign Up successfull !");
    console.log(user);

    jwt.sign({user: user}, 'mysecretkey', (err,token) => {
      res.send(token);
    });
    //res.send(user);

   }
}

module.exports.login = async (req, res) => {
  const {email, password} = req.body;
  const checkUser = await User.findOne({ email });
  if(checkUser){
    const passwordEnteredByUser = password;
    const hash = checkUser.password;

    bcrypt.compare(passwordEnteredByUser, hash, function(error, isMatch) {
      if (error) {
        throw error
      } else if (!isMatch) {
        res.send("Password doesn't match!")
      } else {
        console.log("Password matches!, Sign In successful !")

        jwt.sign({user: checkUser}, 'mysecretkey', (err,token) => {
          res.send(token);
        });

      }
    })

  }
  else{
    res.send("Incorrect email");
  }
}



