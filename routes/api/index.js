const router = require('express').Router();
const tradingRoutes = require('./trading');
const friendRoutes = require('./friends');
const forumRoutes = require('./forum');
const petfolioRoutes = require('./petfolio');


// Trading routes
router.use('/trading', tradingRoutes);

//Social routes
router.use('/friends', friendRoutes);
router.use('/forum', forumRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

module.exports = router;
