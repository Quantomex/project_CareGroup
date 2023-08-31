const mongoose = require('mongoose');

const statementSchema = new mongoose.Schema({
  description: String,
});

module.exports = mongoose.model('Statement', statementSchema);
