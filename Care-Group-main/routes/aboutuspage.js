const express = require('express');
const BoardofDirectors = require('../models/BoardofDirectors');
const ManagementTeam = require('../models/ManagementTeam');
const OrganizationStructure = require('../models/organizationStructure');
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
router.get('/sustainability', (req, res) => {
    res.render('./homepage/sustainability');
});
module.exports = router;