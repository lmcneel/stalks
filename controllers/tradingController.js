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
        db.Trade
            .find({portfolio_id: req.params.portfolio_id}).select('-_id ticker shares')
            .then((dbTradeModel) => res.json(dbTradeModel))
            .catch((err) => res.status(422).json(err));
    },
};

