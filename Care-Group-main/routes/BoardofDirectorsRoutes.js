const express = require('express');
const router = express.Router();
const { uploader } = require('cloudinary').v2;
const BoardofDirectors = require('../models/BoardofDirectors');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const {isAdmin} = require('../middleware/isAdmin');

router.get('/bodform', isAdmin, async (req, res) => {
  const bodData = await BoardofDirectors.find();
  res.render('./admin/bodform', { bodData });
});

router.post('/bodUpload', upload.single('image'), isAdmin, async (req, res) => {
    try {
        const newBod = new BoardofDirectors({
          name: req.body.name,
          description: req.body.description,
          link:req.body.link,
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
