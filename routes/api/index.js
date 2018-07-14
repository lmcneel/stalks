const router = require('express').Router();
const tradingRoutes = require('./trading');
const docRoutes = require('./docs');
const petfolioRoutes = require('./petfolio');
const userAuth = require('./userAuth');

router.use('/userAuth', userAuth);
router.use('/docs', docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

module.exports = router;
