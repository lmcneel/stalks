const router = require('express').Router();
const tradingRoutes = require('./trading');
const friendRoutes = require('./friends');

// Trading routes
router.use('/trading', tradingRoutes);
router.use('/friends', friendRoutes);

module.exports = router;
