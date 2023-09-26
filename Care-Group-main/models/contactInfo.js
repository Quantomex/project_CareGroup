// models/contactInfo.js
const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  location: String,
  contactNumber: String,
  mailbox: String,
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
