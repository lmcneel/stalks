const router = require('express').Router();
const tradingRoutes = require('./trading');
const docRoutes = require('./docs');
const petfolioRoutes = require('./petfolio');
const userProfileRoutes = require('./userProfile');
const userAuthRoutes = require('./userAuth');
router.use('/docs', docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

router.use('/user', userProfileRoutes);

router.use('/auth', userAuthRoutes);
module.exports = router;
