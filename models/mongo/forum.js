const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ForumSchema object
const forumSchema = new Schema({
    subject: {type: String, required: true},
    comments: {type: String, required: true,

    },
});
const Forum = mongoose.model('Forum', forumSchema);
module.exports = Forum;
