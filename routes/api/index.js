const router = require("express").Router();
const tradingRoutes = require("./trading");

// Trading routes
router.use("/trading", tradingRoutes);

module.exports = router;
