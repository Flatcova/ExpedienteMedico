var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.redirect('/doctor');
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    res.render('main/index');
  }
});

module.exports = router;
