const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Leadership = require('../models/Leadership');
const Logo = require('../models/Logo.js')
const Vision = require('../models/visionSection');
const Statement = require('../models/MissionStatement');
const ValuesSection = require ('../models/Values');
const Chairman = require('../models/Chairman');
const Mission= require('../models/Mission');
const CoreValues = require('../models/CoreValues');
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');
router.get('/uploadform', isAdmin, async (req, res) => {
  const leadershipImages = await Leadership.find();
  res.render('./admin/form' , { leadershipImages });
});
// Route to handle image uploads
router.post('/upload', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const newImage = new Leadership({
      name: req.body.name,
      description: req.body.description,
      imageFilename: req.file.filename,
      imagePath: req.file.path,
    });
    await newImage.save();
    req.flash('success', 'Leadership images added successfully');
    res.redirect('/uploadform');
  } catch (error) {
    console.error('Error uploading image:', error);
    req.flash('error', 'Error uploading image');
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

router.get('/', async (req, res) => {
  const leadershipImages = await Leadership.find();
  const logoImages = await Logo.find();
  const visionSection = await Vision.find();
  const st= await Statement.find();
  const ValuesSections = await ValuesSection.find();
  const ChairmanData = await Chairman.find();
  const ce = await CoreValues.find();
  const MissionData = await Mission.find();
  res.render('./homepage/index' , { leadershipImages, logoImages , visionSection , st, ValuesSections , ChairmanData, ce, MissionData});
});

router.post('/delete/:id',isAdmin, async (req, res) => {
  try {
    const deletedImage = await Leadership.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedImage.imageFilename);
    req.flash('success', 'Leadership images deleted successfully');
    res.redirect('/uploadform');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
