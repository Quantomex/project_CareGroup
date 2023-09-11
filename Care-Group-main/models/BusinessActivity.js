const mongoose = require('mongoose');

const baSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('ba', baSchema);
