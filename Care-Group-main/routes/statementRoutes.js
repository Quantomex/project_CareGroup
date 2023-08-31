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