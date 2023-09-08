const express = require('express');
const router = express.Router();
const { uploader } = require('cloudinary').v2;
const ManagementTeam = require('../models/ManagementTeam');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const {isAdmin} = require('../middleware/isAdmin');

router.get('/managementTeamform', isAdmin, async (req, res) => {
  const mtData = await ManagementTeam.find();
  res.render('./admin/mtform', { mtData });
});

router.post('/mtUpload', upload.single('image'), isAdmin, async (req, res) => {
    try {
        const newMt = new ManagementTeam({
          name: req.body.name,
          description: req.body.description,
          link:req.body.link,
          imageFilename: req.file.filename,
          imagePath: req.file.path,
        });
        await newMt.save();
        req.flash('success', 'Management Team content added successfully');
    
        res.redirect('/managementTeamform');
      } catch (error) {
        console.error('Error uploading image:', error);
        req.flash('error', 'Error Uploading content');
        res.status(500).json({ message: 'Error uploading image', error: error.message });
      }
});

router.post('/deleteMt/:id', isAdmin, async (req, res) => {
  try {
    const deletedmT = await ManagementTeam.findByIdAndDelete(req.params.id);
    await uploader.destroy(deletedmT.image.filename);

    res.redirect('/managementTeamform');
  } catch (error) {
    console.error('Error deleting Management Team data:', error);
    res.status(500).json({ message: 'Error deleting Data', error: error.message });
  }
});

module.exports = router;
