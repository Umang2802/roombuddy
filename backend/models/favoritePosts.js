const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritePostsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    posts: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Room'
        }
    ]
});

module.exports = mongoose.model('FavoritePost', favoritePostsSchema);