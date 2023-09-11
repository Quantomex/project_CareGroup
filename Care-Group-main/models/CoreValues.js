const mongoose = require('mongoose');

const CoreValuesSchema = new mongoose.Schema({
  imageFilename: String, 
  imagePath: String, 
  name: String,
});

module.exports = mongoose.model('CoreValues', CoreValuesSchema);
