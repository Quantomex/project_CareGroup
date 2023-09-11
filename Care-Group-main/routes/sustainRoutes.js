const express = require('express');
const router = express.Router();
const { uploader } = require('cloudinary').v2;
const Sustain = require('../models/Sustain');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const {isAdmin} = require('../middleware/isAdmin');

router.get('/Sustainform', isAdmin, async (req, res) => {
  const sData = await Sustain.find();
  res.render('./admin/sustainform', {sData });
});

router.post('/SustainUpload', upload.single('image'), isAdmin, async (req, res) => {
    try {
        const newSustain = new Sustain({
          name: req.body.name,
          description: req.body.description,
          imageFilename: req.file.filename,
          imagePath: req.file.path,
        });
        await newSustain.save();
        req.flash('success', 'Sustain content added successfully');
    
        res.redirect('/Sustainform');
      } catch (error) {
        console.error('Error uploading image:', error);
        req.flash('error', 'Error Uploading content');
        res.status(500).json({ message: 'Error uploading image', error: error.message });
      }
});

router.post('/deleteSustain/:id', isAdmin, async (req, res) => {
  try {
    const deletedSustain = await Sustain.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedSustain.image.path);

    res.redirect('/Sustainform');
  } catch (error) {
    console.error('Error deleting Sustain statement and image:', error);
    res.status(500).json({ message: 'Error deleting Sustain statement and image', error: error.message });
  }
});

module.exports = router;
