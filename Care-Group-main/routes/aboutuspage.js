const express = require('express');
const BoardofDirectors = require('../models/BoardofDirectors');
const ManagementTeam = require('../models/ManagementTeam');
const OrganizationStructure = require('../models/organizationStructure');
const Policy = require('../models/Policy');
const Sustain = require('../models/Sustain');
const BusinessActivity = require('../models/BusinessActivity');
const OurStory = require('../models/OurStory');
const router = express.Router();


router.get('/aboutus', (req, res) => {
    res.render('./homepage/aboutus');
});

router.get('/ourstory', async (req, res) => {
    const story = await OurStory.find();
    res.render('./homepage/ourstory',{story});
});
router.get('/companyprofile', async (req, res) => {

    const ba = await BusinessActivity.find();
    res.render('./homepage/companyprofile',{ba});
});
router.get('/corporategovernance', async (req, res) => {
    const directors = await BoardofDirectors.find({});
    const teams = await ManagementTeam.find({});
    const structures = await OrganizationStructure.find({})
    res.render('./homepage/corporategovernance', { directors, teams, structures });
});

router.get('/sustainability', async (req, res) => {
    const policies = await Policy.find({});
    const sustainabilities = await Sustain.find({})
    res.render('./homepage/sustainability', { policies, sustainabilities });
});
module.exports = router;