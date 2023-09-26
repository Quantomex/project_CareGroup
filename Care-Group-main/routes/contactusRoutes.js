const express = require("express");
const router = express.Router();
const ContactUs = require("../models/contactus");

router.get("/contactus", (req, res) => {
  res.render("./homepage/contactus");
});
// Handle Contact Us Form Submission
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
