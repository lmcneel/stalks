// Require express router
const router = require('express').Router();
// Connect with forumController file
// const forumController = require('../../controllers/forumController');
// const request = require('request');

// Importing Models
const User = require('../../models/mongo/user');
const Forum = require('../../models/mongo/forum');

// This api route serves to present the forum schema with populated data from the mongo db.
router.get('/', (req, res) => {
    Forum.find((err, forum) => {
        if (err) {
            return res.json({err});
        }
        return res.json({data: forum});
    });
});
// This api route serves to create a comment through posting a comment to the forum through the user database.
router.post('/create', (req, res) => {
    User.find()
        .populate('forum')
        .populate({
            path: 'forum',
            populate: {path: 'forumSchema'},
        })
        .exec(function(err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                res.send(foundUser);
            }
        });
});
// This api route serves to delete comments.
router.delete('/delete', (req, res) => {
    Forum.comments.deleteOne();
});


module.exports = router;
