var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Doctor = require('../../models/doctor');
var Assistant = require('../../models/assistant');

// serialize and deserialize
passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
	Doctor.findById(id, function(err, user){
		if (err) done (err);
      if (user){
        done (null, user);
      }else{
        Assistant.findById(id, function(err, user){
          if (err) done(err);
          done(null, user);
        });
      }
	});
});

passport.use('doc-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  Doctor.findOne({ 'profile.correo' : email }, function(err, user) {
    // if there are any errors, return the error before anything else
    if (err){
      return done(err);
    }
    // if no user is found, return the message
    if (!user){
      return done(null, false, req.flash('loginMessage', 'El usuario no se encuentra, intenta nuevamente.')); // req.flash is the way to set flashdata using connect-flash
    }
    // if the user is found but the password is wrong
    if (!user.validPassword(password)){
      return done(null, false, req.flash('loginMessage', 'Oops! Contraseña incorrecta, intenta nuevamente.')); // create the loginMessage and save it to session as flashdata
    }
    // all is well, return successful user
    return done(null, user);
  });
}));


passport.use('assis-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  Assistant.findOne({ 'profile.correo' : email }, function(err, user) {
    // if there are any errors, return the error before anything else
    if (err){
      return done(err);
    }
    // if no user is found, return the message
    if (!user){
      return done(null, false, req.flash('login-error', 'El asistente no se encuentra, intenta nuevamente.')); // req.flash is the way to set flashdata using connect-flash
    }
    // if the user is found but the password is wrong
    if (!user.validPassword(password)){
      return done(null, false, req.flash('login-error', 'Oops! Contraseña incorrecta, intenta nuevamente.')); // create the loginMessage and save it to session as flashdata
    }
    // all is well, return successful user
    return done(null, user);
  });
}));
