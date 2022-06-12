const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
    occupation: String,
    lookingForRoomIn: String,
    lookingToMoveIn: String,
    preferredSize: Number,
    budget: Number,
    preferences:[String],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Userprofile', userProfileSchema);