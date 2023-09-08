const mongoose = require('mongoose');

const ManagementTeamSchema = new mongoose.Schema({
  name: String,
  description: String,
  link:String,
  imageFilename: String, 
  imagePath: String, 
});

module.exports = mongoose.model('ManagementTeam', ManagementTeamSchema);
