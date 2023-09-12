const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const { isAdmin } = require('../middleware/isAdmin');


router.get('/uploadPolicy', isAdmin, async (req, res) => {
    const policy = await Policy.find();
    res.render('./admin/policyForm', { policy });
});
router.get('/editPolicy', isAdmin, async (req, res) => {
    const policy = await Policy.find();
    res.render('./admin/policyedit', { policy });
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

router.get('/our-policies', async (req, res) => {
    const policies = await Policy.find({});
    res.render('./homepage/policies', { policies });
})

module.exports = router;