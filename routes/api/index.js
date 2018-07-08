const router = require('express').Router();
const tradingRoutes = require('./trading');
const docRoutes = require('./docs');

router.use("/docs", docRoutes);
// Trading routes
router.use('/trading', tradingRoutes);


module.exports = router;
