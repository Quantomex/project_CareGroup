const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const CoreValues = require('../models/CoreValues');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');

router.get('/corevalues', isAdmin, async (req, res) => {
  const cv = await CoreValues.find();
  res.render('./admin/corevaluesForm' , { cv });
});
// Route to handle image uploads
router.post('/uploadCV', upload.single('image'),isAdmin,  async (req, res) => {
  try {
    const { imageFilename, path: imagePath } = req.file;
    const { name, description } = req.body; 

    const newCV = new CoreValues({
      imageFilename,
      imagePath,
      name,
      description, 
    });
    await newCV.save();
    req.flash('success', 'Core Values added successfully');
    res.redirect('/corevalues');
  } catch (error) {
    console.error('Error uploading image:', error);
      req.flash('error', 'Error uploading image'); 
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

// Edit Core Values Form Route
router.get('/editCV/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const cv = await CoreValues.findById(id);

    if (!cv) {
      req.flash('error', 'Core Values not found');
      return res.redirect('/corevalues');
    }

    res.render('./admin/editCVForm', { cv });
  } catch (error) {
    console.error('Error retrieving Core Values:', error);
    res.status(500).json({ message: 'Error retrieving Core Values', error: error.message });
  }
});
// Update Core Values Route
router.post('/editCV/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const cv = await CoreValues.findById(id);

    if (!cv) {
      req.flash('error', 'Core Values not found');
      return res.redirect('/corevalues');
    }

    const { imageFilename, path: imagePath } = req.file;
    const { name, description } = req.body;

    cv.imageFilename = imageFilename;
    cv.imagePath = imagePath;
    cv.name = name;
    cv.description = description;

    await cv.save();

    req.flash('success', 'Core Values updated successfully');
    res.redirect('/corevalues');
  } catch (error) {
    console.error('Error updating Core Values:', error);
    res.status(500).json({ message: 'Error updating Core Values', error: error.message });
  }
});


router.post('/delCV/:id',  isAdmin, async (req, res) => {
  try {
    const deletedCV = await CoreValues.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedCV.imagePath);
    req.flash('success', 'Core Value Deleted successfully');
    res.redirect('/corevalues');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
