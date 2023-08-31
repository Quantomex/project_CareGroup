const mongoose = require('mongoose');

const ValuesSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('Values', ValuesSchema);
