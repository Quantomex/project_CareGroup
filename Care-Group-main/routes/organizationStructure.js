const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const router = express.Router();
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });
const { uploader } = require('cloudinary').v2;
const { isAdmin } = require('../middleware/isAdmin');

// Route to handle image uploads
router.get('/organization/structure', async (req, res) => {
    res.render('./admin/organizationstructure');
});


module.exports = router;
