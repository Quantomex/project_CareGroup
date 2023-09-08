const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Mission = require('../models/Mission');
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');


router.get('/MissionSection',isAdmin,  async (req, res) => {
  const MissionSection = await Mission.find();
  res.render('./admin/MissionSection' , { MissionSection });
});
// Route to handle image uploads
router.post('/upload/MissionSection', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const newImage = new Mission({
      name: req.body.name,
      description: req.body.description,
      imageFilename: req.file.filename,
      imagePath: req.file.path,
    });
    await newImage.save();
    req.flash('success', 'Mission content added successfully');

    res.redirect('/MissionSection');
  } catch (error) {
    console.error('Error uploading image:', error);
    req.flash('error', 'Error Uploading content');
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});
router.post('/deleteMission/:id', isAdmin, async (req, res) => {
  try {
    const deletedImage = await Mission.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedImage.imageFilename);
    req.flash('success', 'Mission content deleted successfully');
    res.redirect('/MissionSection');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
