const db = require('../models/mongo');

module.exports = {

    buy: function(req, res) {
        console.log(req.body);
        db.Trade
            .create(req.body)
            .then((dbTradeModel) => {
                console.log(dbTradeModel);
                db.Portfolio
                    .update({_id: dbTradeModel.portfolio_id}, {$push: {trades: dbTradeModel._id}})
                    .then((dbPortfolioModel) => res.json(dbPortfolioModel))
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
    sell: function(req, res) {
        db.Trade
            .create(req.body)
            .then((dbTradeModel) => {
                db.Portfolio
                    .update({_id: dbTradeModel.portfolio_id}, {$push: {trades: dbTradeModel._id}})
                    .then((dbPortfolioModel) => res.json(dbPortfolioModel))
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
    myStocks: function(req, res) {
        console.log(res.params);
        db.Trade
            .find({portfolio_id: req.params.portfolio_id})
            .select('ticker type shares sharePrice date')
            .then((dbTradeModel) => res.json(dbTradeModel))
            .catch((err) => res.status(422).json(err));
    },

    initialCash: function(req, res) {
        db.Portfolio
            .findOne({portfolio_id: req.params.portfolio_id})
            .sort({created_at: 1})
            .then((dbTradeModel) => res.json(dbTradeModel))
            .catch((err) => res.status(422).json(err));
    },

    myPortfolio: function(req, res) {
        db.Portfolio
            .find({_id: req.params.id})
            // .find({portfolio_id: req.params.portfolio_id}).select('-_id ticker shares sharePrice date')
            .then((dbTradeModel) => res.json(dbTradeModel))
            .catch((err) => res.status(422).json(err));
    },
};


