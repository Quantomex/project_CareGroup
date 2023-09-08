const mongoose = require('mongoose');

const OurStorySchema = new mongoose.Schema({
  date: String,
  description: String,
 
});

module.exports = mongoose.model('OurStory', OurStorySchema);
