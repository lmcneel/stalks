const router = require('express').Router();
const tradingRoutes = require('./trading');
const docRoutes = require('./docs');
const petfolioRoutes = require('./petfolio');
const petRoutes = require('./pets');


router.use('/docs', docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

//Pet routes
router.use('/pets', petRoutes);

module.exports = router;
