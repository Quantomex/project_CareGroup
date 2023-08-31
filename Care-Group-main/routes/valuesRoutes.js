const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Values = require('../models/Values');
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const {isAdmin} = require('../middleware/isAdmin');



router.get('/ValuesSection',isAdmin, async (req, res) => {
  const ValuesSection = await Values.find();
  res.render('./admin/ValuesSection' , { ValuesSection });
});
// Route to handle image uploads
router.post('/upload/ValuesSection', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const newImage = new Values({
      name: req.body.name,
      description: req.body.description,
      imageFilename: req.file.filename,
      imagePath: req.file.path,
    });
    await newImage.save();
    req.flash('success', 'Values content added successfully');
    res.redirect('/ValuesSection');
  } catch (error) {
    console.error('Error uploading image:', error);
    req.flash('error', 'Error Uploading content');
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});


router.post('/deleteValues/:id',isAdmin,  async (req, res) => {
  try {
    const deletedImage = await Values.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedImage.imageFilename);
    req.flash('success', 'Values content deleted successfully');
    res.redirect('/ValuesSection');
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});
module.exports = router;
