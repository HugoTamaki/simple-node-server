// app/models/operadora

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OperadoraSchema = new Schema({
  name: String,
  code: String,
  category: String
});

module.exports = mongoose.model('Operadora', OperadoraSchema);