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
    tenantDetails: [{"name": String, "bio": String}]
});




//add tenants after no. of tenants once tenent form is done


module.exports = mongoose.model('Room', roomSchema);