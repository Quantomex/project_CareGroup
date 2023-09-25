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
// Edit Our Story Content Form Route
router.get('/editOurStory/:id', isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const story = await OurStory.findById(id);
  
      if (!story) {
        req.flash('error', 'Our Story content not found');
        return res.redirect('/addOurStory');
      }
  
      res.render('./admin/editOurStoryForm', { story });
    } catch (error) {
      console.error('Error retrieving Our Story content:', error);
      res.status(500).json({ message: 'Error retrieving Our Story content', error: error.message });
    }
  });
// Update Our Story Content Route
router.post('/editOurStory/:id', isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const story = await OurStory.findById(id);
  
      if (!story) {
        req.flash('error', 'Our Story content not found');
        return res.redirect('/addOurStory');
      }
  
      story.date = req.body.date;
      story.description = req.body.description;
  
      await story.save();
  
      req.flash('success', 'Our Story content updated successfully');
      res.redirect('/addOurStory');
    } catch (error) {
      console.error('Error updating Our Story content:', error);
      res.status(500).json({ message: 'Error updating Our Story content', error: error.message });
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