const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    bhk: {
        type: Number,
        required: true
    }, 
    bathroom: {
        type: Number,
        required: true
    }, 
    propertyType: {
        type: String,
        required: true
    },
    smoking:{
        type: Boolean,
        required: true
    },   
    alcohol: {
        type: Boolean,
        required: true
    },   
    pets:{
        type: Boolean,
        required: true
    },  
    vegetarian:{
        type: Boolean,
        required: true
    },
    noOfTenants: {
        type: Number,
        required: true
    }, 
    amenities:[String],
    preferences:[String],
    rentPrice: {
        type: Number,
        required: true
    }, 
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