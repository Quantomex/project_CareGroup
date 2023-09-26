// models/opportunitiesForm.js
const mongoose = require('mongoose');

const opportunitiesFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  department: String,
  gender: String,
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  linkedIn: String,
  currentEmployer: String,
  currentPosition: String,
  experience: {
    type: String,
    required: true,
  },
  noticePeriod: {
    type: String,
    required: true,
  },
  resume: String, // You can store the file path or URL here
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const OpportunitiesForm = mongoose.model('OpportunitiesForm', opportunitiesFormSchema);

module.exports = OpportunitiesForm;
