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
// Route to render the edit Vision Section form
router.get('/editVision/:id', isAdmin, async (req, res) => {
  try {
    // Find the Vision Section by its ID
    const vision = await Vision.findById(req.params.id);

    if (!vision) {
      // Handle the case where the Vision Section is not found
      req.flash('error', 'Vision Section not found');
      return res.redirect('/visionSection');
    }

    // Render a form for editing the Vision Section
    res.render('./admin/editVisionForm', { vision });
  } catch (error) {
    console.error('Error retrieving Vision Section:', error);
    res.status(500).json({ message: 'Error retrieving Vision Section', error: error.message });
  }
});

// Route to handle the form submission for updating the Vision Section
router.post('/editVision/:id', isAdmin, async (req, res) => {
  try {
    // Find the Vision Section by its ID
    const vision = await Vision.findById(req.params.id);

    if (!vision) {
      // Handle the case where the Vision Section is not found
      req.flash('error', 'Vision Section not found');
      return res.redirect('/visionSection');
    }

    // Update Vision Section information based on the form data
    const { name, description } = req.body;
    vision.name = name;
    vision.description = description;

    // Save the updated Vision Section
    await vision.save();

    req.flash('success', 'Vision Section updated successfully');
    res.redirect('/visionSection');
  } catch (error) {
    console.error('Error updating Vision Section:', error);
    res.status(500).json({ message: 'Error updating Vision Section', error: error.message });
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
