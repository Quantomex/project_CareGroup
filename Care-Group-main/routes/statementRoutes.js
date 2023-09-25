const express = require('express');
const router = express.Router();
const Statement = require('../models/MissionStatement');
const {isAdmin} = require('../middleware/isAdmin');


router.get('/uploadStatement',isAdmin,  async (req , res) => {
 const st = await Statement.find();
 res.render('./admin/statement', {st});
});

router.post('/statement', isAdmin, async (req, res) => {
    try{
        const newSt= new Statement ({
            description:req.body.description
        })
        await newSt.save();
        req.flash('success', 'Mission Statement added successfully');
        res.redirect('/uploadStatement');
    }catch (error) {
        console.error('Error Upload Mission Statement', error);
        req.flash('error', 'Error Uploading Mission Statement'); 
    res.status(500).json({message: 'Error Upoading Mission Statement', error: error.message});
    }
});
// Edit Mission Statement Form Route
router.get('/editStatement/:id', isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const statement = await Statement.findById(id);
  
      if (!statement) {
        req.flash('error', 'Mission Statement not found');
        return res.redirect('/uploadStatement');
      }
  
      res.render('./admin/editStatementForm', { statement });
    } catch (error) {
      console.error('Error retrieving Mission Statement:', error);
      res.status(500).json({ message: 'Error retrieving Mission Statement', error: error.message });
    }
  });
  // Update Mission Statement Route
router.post('/editStatement/:id', isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const statement = await Statement.findById(id);
  
      if (!statement) {
        req.flash('error', 'Mission Statement not found');
        return res.redirect('/uploadStatement');
      }
  
      statement.description = description;
      await statement.save();
  
      req.flash('success', 'Mission Statement updated successfully');
      res.redirect('/uploadStatement');
    } catch (error) {
      console.error('Error updating Mission Statement:', error);
      res.status(500).json({ message: 'Error updating Mission Statement', error: error.message });
    }
  });
  
router.post('/deleteStatement/:id', isAdmin, async (req, res) => {
    try{
        const delSt= await Statement.findByIdAndDelete(req.params.id);
        req.flash('success', 'Mission Statement deleted successfully');
        res.redirect('/uploadStatement');
    }catch(error)
        {
        console.error('Error Deleting Mission Statement', error)
        res.status(500).json({ message: "Error Deleting Mission Statement", error:error.message});
        }
});

module.exports= router;