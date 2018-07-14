//Require express router
const router = require('express').Router();
//Connect with forumController file
const forumController = require('../../controllers/forumController');
const request = require("request");

// Importing Models
const User = require('../../models/mongo/user');
const Forum = require('../../models/mongo/forum');

router.post('/create/', (req, res) => {
    User.find()
        .populate('forum')
        .populate({
            path: "forum",
            populate: { path: "posting" }
        })
        .exec(function (err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                res.send(foundUser);
            }
        })
});

router.get('/view/', (req, res) => {
    Forum.find((err, forum) => {
        if (err) {
            return res.json({ err })
        }
        return res.json({ data: forum })
    })
});


router.put('/update/', (req, res) => {

});
router.delete('/delete/', (req, res) => {

});


module.exports = router;