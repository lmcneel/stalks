//Require express router
const router = require('express').Router();
//Connect with forumController file
const forumController = require('../../controllers/forumController');
const request = require("request");

// Importing Models
const User = require('../../models/mongo/user');
const Forum = require('../../models/mongo/forum');

router.post('route/api/create/forum/', (req, res) => {
    User.find()
    .populate('forum')
    .populate({
        path: "forum",
        populate:{ path : "posting"}
    })
    .exec(function(err, foundUser){
        if (err) {
            console.log(err);
        }else{
            res.send(foundUser);
        }
    })
});
router.get('route/api/view/forum/', (req, res) => {

});
router.put('route/api/update/forum/', (req, res) => {

});
router.delete('route/api/delete/forum/', (req, res) => {

});
