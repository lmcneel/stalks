const db = require('../models/mongo');

module.exports = {

    buy: function (req, res) {
        db.Trade
            .create({ trades: req.body })
            .then((dbTradeModel) => {
                db.Portfolio
                    .update({ user_id: dbTradeModel.user_id }, { $push: { trades: dbTradeModel._id } })
                    .then((dbPortfolioModel) => res.json(dbPortfolioModel))
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
    sell: function (req, res) {
        db.Trade
            .create({ trades: req.body })
            .then((dbTradeModel) => {
                db.Portfolio
                    .update({ user_id: dbTradeModel.user_id }, { $push: { trades: dbTradeModel._id } })
                    .then((dbPortfolioModel) => res.json(dbPortfolioModel))
                    .catch((err) => res.status(422).json(err));
            })
            .catch((err) => res.status(422).json(err));
    },
};

