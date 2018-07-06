const db = require('../models/mongo');

module.exports = {

    buy: function(req, res) {
        db.Portfolio
            .update({user_id: req.params.id}, {
                $push:
                    {trades: req.body},
            })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    sell: function(req, res) {
        db.Portfolio
            .update({user_id: req.params.id}, {
                $push:
                    {trades: req.body},
            })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
};
