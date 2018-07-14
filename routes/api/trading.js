// This file files goes in the server side routes folder

const router = require('express').Router();
const tradingController = require('../../controllers/tradingController');
const request = require('request');

// Importing Models
const User = require('../../models/mongo/user');
const Portfolio = require('../../models/mongo/portfolio');
// const Trades = require('../../models/mongo/trade');


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

router.route('/slimquote/:ticker')
.get(function(req, res) {
    console.log('route received' + req.params.ticker);
    request(
      `https://api.iextrading.com/1.0/tops/last?symbols=${req.params.ticker}`,
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
    Portfolio.find({_id: '5b44cd4e020eda5258fcf2c1'})
    // .populate('trades')
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

router.route('/mystocks/:portfolio_id')
.get(tradingController.myStocks);

router.route('/portfolio/initialcash')
.get(tradingController.initialCash);

router.route('/myportfolio/:id')
.get(tradingController.myPortfolio);

module.exports = router;
