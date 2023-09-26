// models/contactInfo.js
const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  location: String,
  contactNumber: String,
  mailbox: String,
  maplocation: String,
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
