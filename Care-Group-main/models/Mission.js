const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('Mission', MissionSchema);
