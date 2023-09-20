const Leadership = require('../models/Leadership');
const CoreValues = require('../models/CoreValues');
const Logo = require('../models/Logo.js')
const Vision = require('../models/visionSection');
const Statement = require('../models/MissionStatement');
const ValuesSection = require ('../models/Values');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const leadershipImages = await Leadership.find();
    const ce = await CoreValues.find();
    const logoImages = await Logo.find();
    const visionSection = await Vision.find();
    const st= await Statement.find();
    const ValuesSections = await ValuesSection.find();
    res.render('./homepage/index' , { leadershipImages, ce ,logoImages , visionSection , st, ValuesSections });
  });