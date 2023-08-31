const express = require('express');
const router = express.Router();
const { uploader } = require('cloudinary').v2;
const Chairman = require('../models/Chairman');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const {isAdmin} = require('../middleware/isAdmin');

router.get('/chairmanform', isAdmin, async (req, res) => {
  const chairmanData = await Chairman.find();
  res.render('./admin/chairmanform', { chairmanData });
});

router.post('/chairmanUpload', upload.single('image'), isAdmin, async (req, res) => {
    try {
        const newChairman = new Chairman({
          name: req.body.name,
          description: req.body.description,
          imageFilename: req.file.filename,
          imagePath: req.file.path,
        });
        await newChairman.save();
        req.flash('success', 'Chairman content added successfully');
    
        res.redirect('/chairmanform');
      } catch (error) {
        console.error('Error uploading image:', error);
        req.flash('error', 'Error Uploading content');
        res.status(500).json({ message: 'Error uploading image', error: error.message });
      }
});

router.post('/deleteChairman/:id', isAdmin, async (req, res) => {
  try {
    const deletedChairman = await Chairman.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedChairman.image.filename);

    res.redirect('/chairmanform');
  } catch (error) {
    console.error('Error deleting chairman statement and image:', error);
    res.status(500).json({ message: 'Error deleting chairman statement and image', error: error.message });
  }
});

module.exports = router;
