// Server side
const router = require('express').Router();
// const request = require('request');

// Models
const User = require('../../models/mysql/user');
const Friends = require('../../models/mysql/friends');

// The url to get this route is /api/friends/view
router.get('/view', (req, res) => {
    Friends.belongsToMany({
        where: {user: id},
        include: [{
            model: User,
            as: 'info',
        }],
    });
});

// The url to get this route is /api/friends/add
router.post('/add', (req, res) => {
    Friends.belongsTo({
        where: {user: id},
        include: [{
            model: User,
            as: 'info',
        }],
    });
});

// The url to get this route is /api/friends/remove
router.delete('/remove ', (req, res) => {
    Friends.belongsTo({
        where: {user: id},
        include: [{
            model: User,
            as: 'info',
        }],
    });
});


module.exports = router;
