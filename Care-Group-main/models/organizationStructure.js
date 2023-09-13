const mongoose = require('mongoose');

const organizationStructure = new mongoose.Schema({
    image: {
        filename: String,
        path: String
    },
    title: String,
    name: String
});

module.exports = mongoose.model('OrganizationStructure', organizationStructure);