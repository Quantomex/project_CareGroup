const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  imageFilename: String, 
  imagePath: String, 
  link: String,
});

module.exports = mongoose.model('Logo', logoSchema);
