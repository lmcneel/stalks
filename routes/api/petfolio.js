const router = require('express').Router();
const petfolioController = require('../../controllers/petfolioController');

router.route('/ticker')
.get(petfolioController.getTickerText);

router.route('/userpic')
.get(petfolioController.getUserPic);

router.route('/addTicker')
.post(petfolioController.addTicker);

router.route('/removeTicker')
.delete(petfolioController.removeTicker);

module.exports = router;
