const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactus");
const ContactInfo = require('../models/contactInfo');

router.get("/contactus", async (req, res) => {
  const c = await ContactInfo.find(); 
  res.render("./homepage/contactus", {c});
});


// Create contact information
router.post('/contactinfo', async (req, res) => {
  try {
    const { location, contactNumber, mailbox } = req.body;

    // Create a new ContactInfo instance
    const newContactInfo = new ContactInfo({ location, contactNumber, mailbox });

    await newContactInfo.save();
    req.flash('success', 'Contact information added successfully');

    res.redirect('/admin/contactinfo');
  } catch (error) {
    console.error('Error creating contact information:', error);
    req.flash('error', 'Error creating contact information');
    res.status(500).json({ message: 'Error creating contact information', error: error.message });
  }
});
// Read contact information
router.get('/admin/contactinfo', async (req, res) => {
  try {
    const contactInfo = await ContactInfo.find(); 
    res.render('./admin/contactInfo', { contactInfo }); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact information', error: error.message });
  }
});

// Edit Contact Information Form Route
router.get('/editcontactinfo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contactInfo = await ContactInfo.findById(id);

    if (!contactInfo) {
      req.flash('error', 'Contact information not found');
      return res.redirect('/admin/contactinfo'); // Adjust the redirect path as needed
    }

    res.render('./admin/editContactInfoForm', { contactInfo }); // Adjust the template path as needed
  } catch (error) {
    console.error('Error retrieving contact information:', error);
    res.status(500).json({ message: 'Error retrieving contact information', error: error.message });
  }
});

// Update Contact Information Route
router.post('/editcontactinfo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contactInfo = await ContactInfo.findById(id);

    if (!contactInfo) {
      req.flash('error', 'Contact information not found');
      return res.redirect('/admin/contactinfo'); // Adjust the redirect path as needed
    }

    const { location, contactNumber, mailbox } = req.body;

    // Update contact information fields
    contactInfo.location = location;
    contactInfo.contactNumber = contactNumber;
    contactInfo.mailbox = mailbox;

    await contactInfo.save();

    req.flash('success', 'Contact information updated successfully');
    res.redirect('/admin/contactinfo'); // Adjust the redirect path as needed
  } catch (error) {
    console.error('Error updating contact information:', error);
    res.status(500).json({ message: 'Error updating contact information', error: error.message });
  }
});

// Delete contact information
router.post('/delcontactinfo/:id', async (req, res) => {
  try {
    await ContactInfo.findByIdAndDelete(req.params.id);
    req.flash('success', 'Contact information deleted successfully');

    res.redirect('/admin/contactinfo');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact information', error: error.message });
  }
});

router.post("/savecontactus", async (req, res) => {
  try {
    const { firstname, lastname, email, contactnumber, message } = req.body;
    // Create a new ContactUs instance
    const newContactUs = new ContactUs({
      firstname,
      lastname,
      email,
      contactnumber,
      message,
    });
    // Save the submission to the database
    await newContactUs.save();
    // Redirect to a success page or display a success message
    req.flash("success", "Your message has been submitted successfully.");
    res.redirect("/contactus");
  } catch (error) {
    console.error("Error submitting contact form:", error);
    req.flash("error", "There was an error submitting your message.");
    res.redirect("/contactus");
  }
});

// Route to display Contact Us submissions on the admin panel
router.get("/admin/contactus", async (req, res) => {
  try {
    // Fetch all ContactUs submissions from the database
    const submissions = await ContactUs.find();
    // Render an EJS template with the submissions data
    res.render("./admin/contactusAdmin", { submissions });
  } catch (error) {
    console.error("Error fetching Contact Us submissions:", error);
    res
      .status(500)
      .json({ message: "Error fetching submissions", error: error.message });
  }
});
// Route to delete a Contact Us submission
router.post("/admin/contactus/delete/:id", async (req, res) => {
    try {
      // Get the ID of the submission to be deleted from the request parameters
      const submissionId = req.params.id;
      
      // Find and delete the submission by ID
      await ContactUs.findByIdAndDelete(submissionId);
  
      // Redirect to the admin panel with a success message
      req.flash("success", "Submission deleted successfully.");
      res.redirect("/admin/contactus");
    } catch (error) {
      console.error("Error deleting Contact Us submission:", error);
      req.flash("error", "There was an error deleting the submission.");
      res.redirect("/admin/contactus");
    }
  });
module.exports = router;
