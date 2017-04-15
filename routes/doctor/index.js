var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.render('main/doctor/index');
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    return res.redirect('/');
  }
});

module.exports = router;
