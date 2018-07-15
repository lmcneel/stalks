
const db = require('../models/mongo');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Doc
      .find(req.query)
      .sort({date: -1})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Doc
      .findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Doc
      .create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Doc
      .findOneAndUpdate({_id: req.params.id}, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Doc
      .findById({_id: req.params.id})
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
