const router = require('express').Router();
const tradingRoutes = require('./trading');
const friendRoutes = require('./friends');
const petfolioRoutes = require('./petfolio');


// Trading routes
router.use('/trading', tradingRoutes);
router.use('/friends', friendRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

module.exports = router;
