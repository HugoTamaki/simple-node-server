// app/models/contato.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContatoSchema = new Schema({
  name: String,
  phone: String,
  operator: {
    name: String,
    code: String,
    category: String
  },
  date: Date
});

module.exports = mongoose.model('Contato', ContatoSchema);