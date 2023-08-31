const mongoose = require('mongoose');

const visionSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('Vision', visionSchema);
