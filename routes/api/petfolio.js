const router = require('express').Router();
const petfolioController = require('../../controllers/petfolioController');

// these might be tradingController.getBankValue?????????
// router.route('/petfolio/portfolio')
//   .get(petfolioController.findPortValue);
// router.route('petfolio/bank')
//   .get(petfolioController.findBankValue);

// this might be petsController????????????
// router.route('petfolio/pets')
//   .get(petfolioController.getPetInfo);

router.route('/ticker')
.get(petfolioController.getTickerText);

module.exports = router;
