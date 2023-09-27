const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const { isAdmin } = require('../middleware/isAdmin');


router.get('/uploadPolicy', isAdmin, async (req, res) => {
    const policy = await Policy.find();
    res.render('./admin/policyForm', { policy });
});
// Edit Policy Route (Render the edit form)
router.get('/editPolicy/:id', isAdmin, async (req, res) => {
    try {
        // Find the policy by ID
        const policy = await Policy.findById(req.params.id);
        
        if (!policy) {
            req.flash('error', 'Policy not found');
            return res.redirect('/uploadPolicy');
        }
        
        res.render('./admin/policyedit', { policy });
    } catch (error) {
        console.error('Error retrieving Policy:', error);
        res.status(500).json({ message: 'Error retrieving Policy', error: error.message });
    }
});

// Update Policy Route (Handle form submission for editing)
router.post('/editPolicy/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the policy by ID
        const policy = await Policy.findById(id);
        
        if (!policy) {
            req.flash('error', 'Policy not found');
            return res.redirect('/uploadPolicy');
        }
        
        // Update policy properties with the new values from the form
        policy.name = req.body.name;
        policy.description = req.body.description;

        // Save the updated policy
        await policy.save();

        req.flash('success', 'Policy updated successfully');
        res.redirect('/uploadPolicy');
    } catch (error) {
        console.error('Error updating Policy:', error);
        res.status(500).json({ message: 'Error updating Policy', error: error.message });
    }
});
router.post('/Policy', isAdmin, async (req, res) => {
    try {
        const newpolicy = new Policy({
            name: req.body.name,
            description: req.body.description,
        })
        await newpolicy.save();
        req.flash('success', 'Mission Policy added successfully');
        res.redirect('/uploadPolicy');
    } catch (error) {
        console.error('Error Upload Mission Policy', error);
        req.flash('error', 'Error Uploading Mission Policy');
        res.status(500).json({ message: 'Error Upoading Mission Policy', error: error.message });
    }
});
router.post('/deletePolicy/:id', isAdmin, async (req, res) => {
    try {
        const delpolicy = await Policy.findByIdAndDelete(req.params.id);
        req.flash('success', 'Mission Policy deleted successfully');
        res.redirect('/uploadPolicy');
    } catch (error) {
        console.error('Error Deleting Mission Policy', error)
        res.status(500).json({ message: "Error Deleting Mission Policy", error: error.message });
    }
});

module.exports = router;