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