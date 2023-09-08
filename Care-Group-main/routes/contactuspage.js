const express = require('express');
const router = express.Router();

router.get('/contactus',(req, res) => {
    res.render('./homepage/contactus');
});

module.exports = router;