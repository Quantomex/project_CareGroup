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


// Add a new route for editing a logo
router.get('/editLogo/:id', isAdmin, async (req, res) => {
  try {
    // Find the logo by its ID
    const logo = await Logo.findById(req.params.id);
    
    if (!logo) {
      // Handle the case where the logo is not found
      req.flash('error', 'Logo not found');
      return res.redirect('/uploadLogoform');
    }
    
    // Render a form for editing the logo
    res.render('./admin/editLogoForm', { logo });
  } catch (error) {
    console.error('Error retrieving logo:', error);
    res.status(500).json({ message: 'Error retrieving logo', error: error.message });
  }
});

// Handle the form submission for updating the logo
router.post('/editLogo/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    // Find the logo by its ID
    const logo = await Logo.findById(req.params.id);
    
    if (!logo) {
      // Handle the case where the logo is not found
      req.flash('error', 'Logo not found');
      return res.redirect('/uploadLogoform');
    }
    
    if (!req.file) {
      // Handle the case where no file was uploaded
      req.flash('error', 'No file uploaded');
      return res.redirect('/editLogo/' + req.params.id); // Redirect back to the edit form
    }
    
    // Update logo information based on the form data
    const { originalname: imageFilename, path: imagePath } = req.file;
    logo.imageFilename = imageFilename;
    logo.imagePath = imagePath;
    logo.link = req.body.link; // Update the link field
    
    // Save the updated logo
    await logo.save();
    
    req.flash('success', 'Logo updated successfully');
    res.redirect('/uploadLogoform');
  } catch (error) {
    console.error('Error updating logo:', error);
    res.status(500).json({ message: 'Error updating logo', error: error.message });
  }
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
