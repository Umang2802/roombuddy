const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const starredRoommateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    roommates: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Roommateprofile'
        }
    ]
});

module.exports = mongoose.model('StarredRoommateProfile', starredRoommateSchema);