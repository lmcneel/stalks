const db = require('../models/mysql');


module.exports = {
    findAll: function (req, res) {
        db.Friends
            .findAll(req.query("SELECT * FROM friends LEFT JOIN u users ON friends.friends_id = users.id WHERE friends.user_id = url.user_id"))
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Friends
            .findOne({ id: req.params.id })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },

    create: function (req, res) {
        db.Friends
            .create(req.body)
            .then((newFriend) => res.json(newFriend))
            .catch((err) => res.status(422).json(err));
    },

    remove: function (req, res) {
        db.Friends
            .destory({ where: { id: req.params.id } })
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
};

