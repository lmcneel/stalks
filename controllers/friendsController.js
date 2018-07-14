const db = require('../models/mysql');

module.exports = {
    findAll: function (req, res) {
        db.Friends
            .findAll(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Friends
            .findOne({ id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },


    // Friendship.belongsTo(User, { as: 'info', foreignKey: 'friend' });
    // User.belongsToMany(User, { as: 'friendship', through: Friendship, foreignKey: 'user', otherKey: 'friend' });
    // User.hasMany(Friendship, { as: 'friends', foreignKey: 'user' });

};

