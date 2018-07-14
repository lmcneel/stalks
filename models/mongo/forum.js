const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ForumSchema object
const forumSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    comments: {
        comment_id: Schema.Types.ObjectId,
        ref: 'Comment',
    },
});
const Forum = mongoose.model('Forum', forumSchema);
module.exports = Forum;