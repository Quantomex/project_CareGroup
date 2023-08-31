const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const Logo = require('../models/Logo');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');
router.get('/uploadLogoform', isAdmin, async (req, res) => {
  const logoImages = await Logo.find();
  res.render('./admin/logoForm' , { logoImages });
});
// Route to handle image uploads
router.post('/uploadLogo', upload.single('image'),isAdmin,  async (req, res) => {
  try {
    const { imageFilename, path: imagePath } = req.file;
    const { link } = req.body; 

    const newImage = new Logo({
      imageFilename,
      imagePath,
      link, 
    });
    await newImage.save();
    req.flash('success', 'Logo added successfully');
    res.redirect('/uploadLogoform');
  } catch (error) {
    console.error('Error uploading image:', error);
      req.flash('error', 'Error uploading image'); 
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

router.get('/', async (req, res) => {
  const logoImages = await Logo.find();
  res.render('./homepage/index' , { logoImages });
});

router.post('/delLogo/:id',  isAdmin, async (req, res) => {
  try {
    const deletedImage = await Logo.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedImage.imagePath);
    req.flash('success', 'Logo Deleted successfully');
    res.redirect('/uploadLogoform');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
