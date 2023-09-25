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
// Edit Management Team Content Form Route
router.get('/editMt/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const mt = await ManagementTeam.findById(id);

    if (!mt) {
      req.flash('error', 'Management Team content not found');
      return res.redirect('/managementTeamform');
    }

    res.render('./admin/editMtForm', { mt });
  } catch (error) {
    console.error('Error retrieving Management Team content:', error);
    res.status(500).json({ message: 'Error retrieving Management Team content', error: error.message });
  }
});
// Update Management Team Content Route
router.post('/editMt/:id', upload.single('image'), isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const mt = await ManagementTeam.findById(id);

    if (!mt) {
      req.flash('error', 'Management Team content not found');
      return res.redirect('/managementTeamform');
    }

    mt.name = req.body.name;
    mt.description = req.body.description;
    mt.link = req.body.link;

    if (req.file) {
      mt.imageFilename = req.file.filename;
      mt.imagePath = req.file.path;
    }

    await mt.save();

    req.flash('success', 'Management Team content updated successfully');
    res.redirect('/managementTeamform');
  } catch (error) {
    console.error('Error updating Management Team content:', error);
    res.status(500).json({ message: 'Error updating Management Team content', error: error.message });
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
