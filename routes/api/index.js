const router = require('express').Router();
const tradingRoutes = require('./trading');
const docRoutes = require('./docs');
const petfolioRoutes = require('./petfolio');
const userAuthRoutes = require('./userAuth');


router.use('/docs', docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

router.use('/userAuth', userAuthRoutes);

module.exports = router;
