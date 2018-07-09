const router = require('express').Router();
const tradingRoutes = require('./trading');
const forumRoutes = require('./forum');

// Trading routes
router.use('/trading', tradingRoutes);
router.use('/forum', forumRoutes);

module.exports = router;
