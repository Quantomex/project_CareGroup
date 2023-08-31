const mongoose = require('mongoose');

const ChairmanSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('Chairman', ChairmanSchema);
