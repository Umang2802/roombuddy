const { roomSchema } = require("./schemas");
const { roommateProfileSchema } = require("./schemas");
const Room = require("./models/room");

module.exports.validateRoom = (req, res, next) => {
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
  } = req.body;

  const { error } = roomSchema.validate({
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
  });
  if (error) {
    res.send("JOI validation error for room");
    const msg = error.details.map((el) => el.message).join(",");
    console.log(msg);
  } else {
    next();
  }
};

module.exports.validateRoommateProfile = (req, res, next) => {
  const { error } = roommateProfileSchema.validate(req.body);
  if (error) {
    res.send("JOI validation error for user profile");
    const msg = error.details.map((el) => el.message).join(",");
    console.log(msg);
  } else {
    next();
  }
};

module.exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.send("Forbidden");
  }
};
