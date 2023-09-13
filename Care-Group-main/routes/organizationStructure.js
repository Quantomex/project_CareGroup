const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const OrganizationStructure = require('../models/organizationStructure');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const { isAdmin } = require('../middleware/isAdmin');

// Route to handle image uploads
router.get('/organization/structure', async (req, res) => {
    const structures = await OrganizationStructure.find({});
    res.render('./admin/organizationstructure', { structures });
});


router.post('/organization', upload.single('image'), async (req, res) => {
    const { filename, path } = req.file;
    const { name, title } = req.body;
    const structure = new OrganizationStructure({
        image: { filename, path },
        name,
        title
    });
    await structure.save();
    return res.redirect('/organization/structure');
});

module.exports = router;
