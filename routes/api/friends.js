//Server side
const router = require('express').Router();
const request = require('request');

//Models
const User = require('../../models/mysql/user');
const Friendship = require('../../models/mysql/friends');


router.get('/api/view/friends', (req, res) => {
    Friendship.findAll({
        where: { user: id },
        include: [{
            model: User,
            as: 'info'
        }]
    });
});

router.post('/api/create/friend', (req, res) => {

});

router.delete('/api/delete/friend ', (req, res) => {

});


module.exports = router;