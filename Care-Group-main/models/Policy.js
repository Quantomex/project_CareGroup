const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  name: String,
  description: String,
 
});

module.exports = mongoose.model('Policy', policySchema);
