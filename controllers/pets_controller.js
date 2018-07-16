const db = require('../models/mysql');

module.exports = {
  findAll: function (req, res) {
    db.Pet
      .findAll(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Pet
      .findOne({id: req.params.id})
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Pet
      .create(req.body)
      .then((newPet) => res.json(newPet))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Pet
      .update(req.body, { where: { id: req.params.id } })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Pet
      .destory({ where: { id: req.params.id } })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getstorefoodandtoy: (req, res) => {
    db.ItemStore
      .findAll({ where: { category: ['food', 'toy'] } })
      .then(foodandtoy => res.send(foodandtoy))
      .catch(err => res.send(err))
  },
  getstoreaccessories: (req, res) => {
    db.ItemStore
      .findAll({ where: { category: 'accessory' } })
      .then(accessories => res.send(accessories))
      .catch(err => res.send(err))
  },
  getuseraccessories: (req, res) => {
    db.Pet.findById(req.params.id)
    .then((pet) => {
      pet.getAccessories({ where: { category: 'accessory' } })
        .then((accessories) => {
          res.send(accessories);
        })
    })
  },
  getuserfoodandtoys: (req, res) => {
    db.Pet.findById(req.params.id)
    .then((pet) => {
      pet.getAccessories({ where: { category: ['food', 'toy'] } })
        .then((foodandtoy) => {
          res.send(foodandtoy);
        })
    })
  }
};

