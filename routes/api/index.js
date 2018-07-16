const router = require('express').Router();
const tradingRoutes = require('./trading');
const friendRoutes = require('./friends');
const forumRoutes = require('./forum');
const docRoutes = require('./docs');
const petfolioRoutes = require('./petfolio');
const petRoutes = require('./pets');


router.use('/docs', docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);

// Social routes
router.use('/friends', friendRoutes);
router.use('/forum', forumRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

//Pet routes
router.use('/pets', petRoutes);

module.exports = router;
