// Server side
const router = require('express').Router();
// const request = require('request');

// Models
const User = require('../../models/mysql/user');
const Friends = require('../../models/mysql/friends');

// The url to get this route is /api/friends/view/:id
router.get('/user/1/friends/2', (req, res) => {
    Friends.belongsToMany({
        // where: {user: id},
        // include: [{
        //     model: User,
        //     as: 'info',
        // }],
    });
});

router.post('/create/friend', (req, res) => {

});

router.delete('/delete/friend ', (req, res) => {

});


module.exports = router;
