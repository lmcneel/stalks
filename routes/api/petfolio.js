const router = require('express').Router();
const petfolioController = require('../../controllers/petfolioController');
// const db = require('../models/mysql');

// these might be tradingController.getBankValue?????????
// router.route('/petfolio/portfolio')
//   .get(petfolioController.findPortValue);
// router.route('petfolio/bank')
//   .get(petfolioController.findBankValue);

// this might be petsController????????????
// router.route('petfolio/pets')
//   .get(petfolioController.getPetInfo);

router.route('petfolio/ticker')
.get(petfolioController.getTickerText);
// router.route('petfolio/ticker')
//   .get(function(req, res) {
//     db.UserWatchList.findAll({}).then(function(dbWL){
//       console.log(dbWL);
//     });
//   });

module.exports = router;
