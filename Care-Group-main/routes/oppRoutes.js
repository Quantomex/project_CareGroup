const express = require('express');
const router = express.Router();
const OpportunitiesForm = require('../models/opportunitiesForm');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mailjetApiKey = '9466657aba028891f2be915ff6e7682e'; // Replace with your Mailjet API key
const mailjetApiSecret = 'bfd20b215e66c55da5583032aa4f3d19';
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(mailjetApiKey, mailjetApiSecret);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
});

const upload = multer({ storage: storage });
// Display the form
router.get('/career', (req, res) => {
    res.render('./homepage/career');
});
// Handle form submission with file upload using multer
router.post('/opportunitiesform', upload.single('resume'), async (req, res) => {
  try {
    // Extract form data, including the uploaded file
    const {
      firstName,
      lastName,
      department,
      gender,
      email,
      contact,
      linkedIn,
      currentEmployer,
      currentPosition,
      experience,
      noticePeriod,
    } = req.body;

    const resume = req.file ? req.file.filename : ''; 

  
    const newOpportunitiesForm = new OpportunitiesForm({
      firstName,
      lastName,
      department,
      gender,
      email,
      contact,
      linkedIn,
      currentEmployer,
      currentPosition,
      experience,
      noticePeriod,
      resume, 
    });

    // Save the form submission to the database
    await newOpportunitiesForm.save();
    // Email Integration 
    const emailData = {
      FromEmail: 'mustafa12azhar@gmail.com', // Set your email as the sender
      FromName: 'Mustafa Azhar',
      Recipients: [
        {
          Email: 'info@caregroup.com.pk', // Set the admin's email address
          Name: 'Admin',
        },
      ],
      Subject: 'New Job Opportunity Submission',
      TextPart: 'A new job opportunity submission has been received.',
      HTMLPart: `
        <h3>New Job Opportunity Submission</h3>
        <p>A new job opportunity submission has been received.</p>
        <!-- Add more content here as needed -->
      `,
    };
    
    // Send the email
    mailjet
      .post('send', { version: 'v3' })
      .request(emailData)
      .then((result) => {
        // No need for console.log
      })
      .catch((err) => {
        // No need for console.log
      });
    
    
    // Redirect to a success page or display a success message
    req.flash('success', 'Your form submission has been received.');
    res.redirect('/career');
  } catch (error) {
    console.error('Error submitting form:', error);
    req.flash('error', 'There was an error submitting the form.');
    res.redirect('/career');
  }
});
router.get('/admin/opform', async (req, res) => {
    try {
      // Fetch all OpportunitiesForm submissions from the database
      const submissions = await OpportunitiesForm.find();
  
      // Render an EJS template with the submissions data
      res.render('./admin/opportunitiesFormAdmin', { submissions });
    } catch (error) {
      console.error('Error fetching OpportunitiesForm submissions:', error);
      res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
  });
  // Route to download the resume
router.get('/admin/opportunitiesform/download/:id', async (req, res) => {
    try {
      const submission = await OpportunitiesForm.findById(req.params.id);
  
      if (!submission) {
        return res.status(404).send('Submission not found');
      }
  
      // Check if a resume file exists
      if (submission.resume) {
        // Set appropriate response headers for downloading the file
        res.setHeader('Content-Disposition', `attachment; filename="${submission.resume}"`);
        res.setHeader('Content-Type', 'application/pdf'); // Adjust the content type based on the file type
  
        // Send the resume file as a response
        const fileStream = fs.createReadStream(path.join(__dirname, '..', 'uploads', submission.resume));
        fileStream.pipe(res);
      } else {
        res.status(404).send('Resume not found');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      res.status(500).send('Error downloading resume');
    }
  });
  // Route to delete an OpportunitiesForm submission
router.post('/admin/opportunitiesform/delete/:id', async (req, res) => {
    try {
      const submission = await OpportunitiesForm.findById(req.params.id);
  
      if (!submission) {
        return res.status(404).send('Submission not found');
      }
  
      // Check if a resume file exists and delete it if it does
      if (submission.resume) {
        const filePath = path.join(__dirname, '..', 'uploads', submission.resume);
        fs.unlinkSync(filePath); // Delete the resume file
      }
  
      // Delete the submission from the database
      await OpportunitiesForm.findByIdAndDelete(req.params.id);
  
      req.flash('success', 'Submission deleted successfully.');
      res.redirect('/admin/opform'); // Redirect to the admin panel
    } catch (error) {
      console.error('Error deleting submission:', error);
      req.flash('error', 'Error deleting submission.');
      res.redirect('/admin/opform'); // Redirect to the admin panel with an error message
    }
  });
module.exports = router;
