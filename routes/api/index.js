const router = require('express').Router();
const tradingRoutes = require('./trading');
const forumRoutes = require('./forum');
const petfolioRoutes = require('./petfolio');


// Trading routes
router.use('/trading', tradingRoutes);
router.use('/forum', forumRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

module.exports = router;
