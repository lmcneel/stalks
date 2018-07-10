//Server side
const router = require('express').Router();
const request = require('request');

//Models
const User = require('../../models/mysql/user');
const Friends = require('../../models/mysql/friends');


router.get('/api/view/friends', (req, res) => {
    Friends.findAll({
        where: {
            user_id: //Users ID
            user_id
        }
    })
});

router.post('/api/create/friend', (req, res) => {

});

router.delete('/api/delete/friend ', (req, res) => {

});


module.exports = router;