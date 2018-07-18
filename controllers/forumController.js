const db = require('../models/mongo');

module.exports = {
    findAll: function(req, res) {
        db.Forum
            .findAll(req.query)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.Forum
            .findOne({id: req.params.id})
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Forum
          .create(req.body)
          .then((newSubject) => res.json(newSubject))
          .catch((err) => res.status(422).json(err));
      },

};
