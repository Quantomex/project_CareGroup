const express = require('express');
const router = express.Router();
const { uploader } = require('cloudinary').v2;
const BoardofDirectors = require('../models/BoardofDirectors');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { isAdmin } = require('../middleware/isAdmin');

router.get('/bodform', isAdmin, async (req, res) => {
  const bodData = await BoardofDirectors.find();
  res.render('./admin/bodform', { bodData });
});

router.post('/bodUpload', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const newBod = new BoardofDirectors({
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      imageFilename: req.file.filename,
      imagePath: req.file.path,
    });
    await newBod.save();
    req.flash('success', 'Board of Directors content added successfully');

    res.redirect('/bodform');
  } catch (error) {
    console.error('Error uploading image:', error);
    req.flash('error', 'Error Uploading content');
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});
// Edit Board of Directors Content Form Route
router.get('/editBod/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const bod = await BoardofDirectors.findById(id);

    if (!bod) {
      req.flash('error', 'Board of Directors content not found');
      return res.redirect('/bodform');
    }

    res.render('./admin/editBodForm', { bod });
  } catch (error) {
    console.error('Error retrieving Board of Directors content:', error);
    res.status(500).json({ message: 'Error retrieving Board of Directors content', error: error.message });
  }
});
// Update Board of Directors Content Route
router.post('/editBod/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const bod = await BoardofDirectors.findById(id);

    if (!bod) {
      req.flash('error', 'Board of Directors content not found');
      return res.redirect('/bodform');
    }

    bod.name = req.body.name;
    bod.description = req.body.description;
    bod.link = req.body.link;

    if (req.file) {
      bod.imageFilename = req.file.filename;
      bod.imagePath = req.file.path;
    }

    await bod.save();

    req.flash('success', 'Board of Directors content updated successfully');
    res.redirect('/bodform');
  } catch (error) {
    console.error('Error updating Board of Directors content:', error);
    res.status(500).json({ message: 'Error updating Board of Directors content', error: error.message });
  }
});

router.post('/deleteBod/:id', isAdmin, async (req, res) => {
  try {
    const deletedBod = await BoardofDirectors.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedBod.image.filename);

    res.redirect('/bodform');
  } catch (error) {
    console.error('Error deleting Board of directors data:', error);
    res.status(500).json({ message: 'Error deleting Data', error: error.message });
  }
});

module.exports = router;
