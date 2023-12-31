const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require('../models/Admin');

const {isAdmin} = require('../middleware/isAdmin');
// Admin Signup
router.get('/admin/signup', (req, res) => {
  res.render('./admin/adminSignup');
});
router.get('/admin/panel', isAdmin, (req, res) => {
  res.render('./admin/adminPanel');
});

router.post('/admin/signup', async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    const foundUser = await Admin.findOne({ username });
    if (foundUser) {
        req.flash('error', 'Email already in use. Try different Email or Login instead.')
      return res.redirect('/admin/signup');
    }
    
    const admin = new Admin({ ...req.body });
    
    await Admin.register(admin, password);
    passport.authenticate('admin')(req, res, () => {
      res.redirect('/admin/login');
    });
  } catch (err) {
    next(err);
  }
});

// Admin Login
router.get('/admin/login', (req, res) => {
  res.render('./admin/adminLogin');
});

router.post('/admin/login', passport.authenticate('admin', {
  failureRedirect: '/admin/login',
  failureFlash: true
}), (req, res) => {
   req.flash('success', 'Welcome back, admin!');
  
  res.redirect('/uploadLogoform');
});


module.exports = router;
