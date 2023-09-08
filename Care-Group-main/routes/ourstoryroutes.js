const express = require('express');
const router = express.Router();
const OurStory = require('../models/OurStory');
const {isAdmin} = require('../middleware/isAdmin');


router.get('/addOurStory',isAdmin,  async (req , res) => {
 const story = await OurStory.find();
 res.render('./admin/ourstory', {story});
});

router.post('/uploadourstory', isAdmin, async (req, res) => {
    try{
        const newstory= new OurStory ({
            date:req.body.date,
            description:req.body.description,
        })
        await newstory.save();
        req.flash('success', 'Our Story content added successfully');
        res.redirect('/ourstory');
    }catch (error) {
        console.error('Error Upload Our Story content', error);
        req.flash('error', 'Error Uploading Our Story content'); 
    res.status(500).json({message: 'Error Uploading Our Story content', error: error.message});
    }
});
router.post('/deleteOurStory/:id', isAdmin, async (req, res) => {
    try{
        const delstory= await OurStory.findByIdAndDelete(req.params.id);
        req.flash('success', 'Our Story deleted successfully');
        res.redirect('/uploadPolicy');
    }catch(error)
        {
        console.error('Error Deleting  Our Story content', error)
        res.status(500).json({ message: "Error Deleting Mission Policy", error:error.message});
        }
});

module.exports= router;