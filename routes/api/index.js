const router = require('express').Router();
const tradingRoutes = require('./trading');
const petfolioRoutes = require('./petfolio');


// Trading routes
router.use('/trading', tradingRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

module.exports = router;
