const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
    address: String,  
    description: String,
    bhk: Number,   
    bathroom: Number,   
    propertyType:  String, 
    smoking: Boolean, 
    alcohol: Boolean, 
    pets: Boolean,
    vegetarian:Boolean,  
    noOfTenants: Number,
    amenities:[String],
    preferences:[String],
    rentPrice: Number,
    images: [
        {
            url: String,
            filename: String
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tenantDetails: [{"name": String, "bio": String}],
    reports: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            message: String
        }
    ],
    coordinates: [Number],
    total_sqft: Number
});


module.exports = mongoose.model('Room', roomSchema);