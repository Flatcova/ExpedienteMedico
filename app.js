var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var lodash = require('lodash');

var index = require('./routes/index');
var doc_login = require('./routes/account/doc_login');
var assis_login = require('./routes/account/assis_login');
var signup = require('./routes/account/signup');
var logout = require('./routes/account/logout');
var doctor = require('./routes/doctor/index');
var assistant = require('./routes/assistant/index');

var app = express();
var engine = require('ejs-mate');
var configDB = require('./config/database.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);


mongoose.connect(configDB.url, function(err){
  if (!err)
    console.log('Connected to database');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUnitialized: true,
  secret: "T^!c4",
  store: new MongoStore({url: configDB.url, autoReconnect:true})
  // configDB.url
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup', signup);
app.use('/doctor-login', doc_login);
app.use('/assistant-login', assis_login);
app.use('/doctor', doctor);
app.use('/assistant', assistant);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
