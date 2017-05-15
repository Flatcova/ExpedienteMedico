var express = require('express');
var router = express.Router();
var async = require('async');

const UserController = require('./../../controllers/usuario');
/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.user && req.user.profile.doc === true){
    return res.redirect('/doctor');
  }else if(req.user && req.user.profile.doc === false){
    return res.redirect('/assistant');
  }else {
    res.render('main/register/signup', {
      errors: req.flash('errors')
    });
  }
});

router.post('/', UserController.createUser);

module.exports = router;
