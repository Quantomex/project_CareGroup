const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Vision = require('../models/visionSection');
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');


router.get('/visionSection',isAdmin,  async (req, res) => {
  const visionSection = await Vision.find();
  res.render('./admin/visionSection' , { visionSection });
});
// Route to handle image uploads
router.post('/upload/visionSection', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const newImage = new Vision({
      name: req.body.name,
      description: req.body.description,
      imageFilename: req.file.filename,
      imagePath: req.file.path,
    });
    await newImage.save();
    req.flash('success', 'Vision content added successfully');

    res.redirect('/visionSection');
  } catch (error) {
    console.error('Error uploading image:', error);
    req.flash('error', 'Error Uploading content');
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});
router.post('/deleteVision/:id', isAdmin, async (req, res) => {
  try {
    const deletedImage = await Vision.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedImage.imageFilename);
    req.flash('success', 'Vision content deleted successfully');
    res.redirect('/visionSection');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
