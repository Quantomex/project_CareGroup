const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  name: String,
  description: String,
  link:String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('BoardofDirectors', DirectorSchema);
