const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const docSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  article: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
  },
  keywords: {
    type: Array,
  },
  language: {
      type: String,
  },
  helpful: {
      type: Number,
  },
});

const Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;


