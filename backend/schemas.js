const Joi = require('joi');

module.exports.roomSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().required(),
    bhk: Joi.number().required(),
    bathroom: Joi.number().required(),
    propertyType: Joi.string().required(),
    smoking: Joi.boolean().required(),
    alcohol: Joi.boolean().required(),
    pets: Joi.boolean().required(),
    vegetarian: Joi.boolean().required(),
    noOfTenants: Joi.number().required(),
    amenities: Joi.array(),
    preferences: Joi.array(),
    rentPrice: Joi.number().required(),
});

module.exports.roommateProfileSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    occupation: Joi.string().required(),
    lookingForRoomIn: Joi.string().required(),
    lookingToMoveIn: Joi.string().required(),
    preferredSize: Joi.number().required(),
    budget: Joi.number().required(),
    preferences: Joi.array(),
});