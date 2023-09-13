const express = require('express');
const BoardofDirectors = require('../models/BoardofDirectors');
const ManagementTeam = require('../models/ManagementTeam');
const OrganizationStructure = require('../models/organizationStructure');
const Policy = require('../models/Policy');
const Sustain = require('../models/Sustain');
const router = express.Router();

router.get('/aboutus', (req, res) => {
    res.render('./homepage/aboutus');
});
router.get('/career', (req, res) => {
    res.render('./homepage/career');
});
router.get('/ourstory', (req, res) => {
    res.render('./homepage/ourstory');
});
router.get('/companyprofile', (req, res) => {
    res.render('./homepage/companyprofile');
});
router.get('/corporategovernance', async (req, res) => {
    const directors = await BoardofDirectors.find({});
    const teams = await ManagementTeam.find({});
    const structures = await OrganizationStructure.find({})
    res.render('./homepage/corporategovernance', { directors, teams, structures });
});
router.get('/careers', (req, res) => {
    res.render('./homepage/career');
});
router.get('/sustainability', async (req, res) => {
    const policies = await Policy.find({});
    const sustainabilities = await Sustain.find({})
    res.render('./homepage/sustainability', { policies, sustainabilities });
});
module.exports = router;