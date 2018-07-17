// Server side
const router = require('express').Router();
const friendsController = require('../../controllers/friendsController');
// const request = require('request');

// Models
const User = require('../../models/mysql/user');
const Friends = require('../../models/mysql/friends');

// The url to get this route is /api/friends/view
router.route('/view')
    .get(friendsController.findAll);


// The url to get this route is /api/friends/view/:id
router.route('/view/:id')
    .get(friendsController.findById);

router.post('/add')
    .post(friendsController.create);

// The url to get this route is /api/friends/remove
router.route('/remove')
    .delete(friendsController.remove);


module.exports = router;
