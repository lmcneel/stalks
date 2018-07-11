// This file files goes in the server side routes folder

const router = require('express').Router();
const tradingController = require('../../controllers/tradingController');
const request = require('request');


// Importing Models
const User = require('../../models/mongo/user');
const Portfolio = require('../../models/mongo/portfolio');
const Trade = require('../../models/mongo/trade');


router.route('/quote/:ticker')
.get(function(req, res) {
    console.log('route received' + req.params.ticker);
    request(
      `https://api.iextrading.com/1.0/stock/${req.params.ticker}/batch?types=quote,news,chart&range=1m&last=1`,
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const found = JSON.parse(body);
            res.json(found);
            // console.log(found);
        } else {
            console.log(error);
            found = {};
        };
      }
    );
});

// @route GET api/trading
// @desc  Get all Portfolio
// @access Public
// Fetch all the items from the Portfolio Collection in the database
// To test it put the following route in Postman http://localhost:3000/api/trading/users

router.get('/users', (req, res) => {
    User.find()
    .populate('portfolios')
    .populate({
        path: 'portfolios',
        populate: {path: 'trades'},
    })
    .exec(function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            res.send(foundUser);
        }
    });
});

router.get('/trades', (req, res) => {
    Trade.find()
    // .populate('portfolios')
    // .populate({
    //     path: 'porfolios',
    //     populate:{ path : 'trades'}
    // })
    .exec(function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            res.send(foundUser);
        }
    });
 });
router.get('/portfolio', (req, res) => {
    Portfolio.find()
    .populate('trades')
    // .populate({
    //     path: 'porfolios',
    //     populate:{ path : 'trades'}
    // })
    .exec(function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            res.send(foundUser);
        }
    });
});
router.route('/buy')
.post(tradingController.buy);
router.route('/sell')
.post(tradingController.sell);


module.exports = router;
