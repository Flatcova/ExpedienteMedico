var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConf = require('../../config/strategies/localStrategy');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.redirect('/doctor');
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    res.render('main/register/login', {
      login_error: req.flash('loginMessage')
    });
  }
});

router.post('/', passport.authenticate('doc-login', {
	successRedirect: '/doctor',
	failureRedirect: '/doctor-login',
	failureFlash: true
}));

module.exports = router;
