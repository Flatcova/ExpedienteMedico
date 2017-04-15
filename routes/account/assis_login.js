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
      login_error: req.flash('login-error')
    });
  }
});

router.post('/', passport.authenticate('assis-login', {
	successRedirect: '/assistant',
	failureRedirect: '/assistant-login',
	failureFlash: true
}));

module.exports = router;
