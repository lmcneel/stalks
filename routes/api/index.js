const router = require('express').Router();
const tradingRoutes = require('./trading');
const friendRoutes = require('./friends');
const forumRoutes = require('./forum');
const docRoutes = require('./docs');
const petfolioRoutes = require('./petfolio');
const userProfileRoutes = require('./userProfile');
const userAuthRoutes = require('./userAuth');
router.use('/docs', docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);

// Social routes
router.use('/friends', friendRoutes);
router.use('/forum', forumRoutes);

// Petfolio routes
router.use('/petfolio', petfolioRoutes);

router.use('/user', userProfileRoutes);

router.use('/auth', userAuthRoutes);
module.exports = router;
