const mongoose = require('mongoose');

const CoreValuesSchema = new mongoose.Schema({
  imageFilename: String, 
  imagePath: String, 
  name: String,
  description: String,
});

module.exports = mongoose.model('CoreValues', CoreValuesSchema);
