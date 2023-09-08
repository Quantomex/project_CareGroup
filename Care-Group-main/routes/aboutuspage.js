const express = require('express');
const router = express.Router();

router.get('/aboutus',(req, res) => {
    res.render('./homepage/aboutus');
});
router.get('/ourstory',(req, res)=>{
    res.render('./homepage/ourstory');
});
router.get('/companyprofile',(req, res)=>{
    res.render('./homepage/companyprofile');
});
router.get('/corporategovernance',(req, res)=>{
    res.render('./homepage/corporategovernance');
});

module.exports = router;