const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const ba = require('../models/BusinessActivity');
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');


router.get('/basection',isAdmin,  async (req, res) => {
  const baSection = await ba.find();
  res.render('./admin/baSection' , { baSection });
});
// Route to handle image uploads
router.post('/upload/baSection', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const newImage = new ba({
      name: req.body.name,
      description: req.body.description,
      imageFilename: req.file.filename,
      imagePath: req.file.path,
    });
    await newImage.save();
    req.flash('success', 'Business Activity content added successfully');

    res.redirect('/basection');
  } catch (error) {
    console.error('Error uploading image:', error);
    req.flash('error', 'Error Uploading content');
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});
router.post('/deleteBa/:id', isAdmin, async (req, res) => {
  try {
    const deletedImage = await ba.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedImage.imagePath);
    req.flash('success', 'Business Activity content deleted successfully');
    res.redirect('/basection');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
