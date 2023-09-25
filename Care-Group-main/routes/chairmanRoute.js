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
// Edit Chairman Content Form Route
router.get('/editChairman/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const chairman = await Chairman.findById(id);

    if (!chairman) {
      req.flash('error', 'Chairman content not found');
      return res.redirect('/chairmanform');
    }

    res.render('./admin/editChairmanForm', { chairman });
  } catch (error) {
    console.error('Error retrieving Chairman content:', error);
    res.status(500).json({ message: 'Error retrieving Chairman content', error: error.message });
  }
});
// Update Chairman Content Route
router.post('/editChairman/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const chairman = await Chairman.findById(id);

    if (!chairman) {
      req.flash('error', 'Chairman content not found');
      return res.redirect('/chairmanform');
    }

    chairman.name = req.body.name;
    chairman.description = req.body.description;

    if (req.file) {
      chairman.imageFilename = req.file.filename;
      chairman.imagePath = req.file.path;
    }

    await chairman.save();

    req.flash('success', 'Chairman content updated successfully');
    res.redirect('/chairmanform');
  } catch (error) {
    console.error('Error updating Chairman content:', error);
    res.status(500).json({ message: 'Error updating Chairman content', error: error.message });
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
