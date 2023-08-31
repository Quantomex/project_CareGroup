const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('Leadership', leadershipSchema);
