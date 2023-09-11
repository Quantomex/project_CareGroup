const mongoose = require('mongoose');

const SustainSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('Sustain', SustainSchema);
