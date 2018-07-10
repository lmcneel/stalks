const mongoose = require('mongoose');
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const commentSchema = new Schema({
    forum_id: String,
    date: {type: Date, default: Date.now},
    type: String,
});

// This creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model('Comment', commentSchema);

// Export the Portfolio model
module.exports = Comment;