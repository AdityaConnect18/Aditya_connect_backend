require('./Config/config');
require('./Config/db');
require('./Config/passportConfig');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var indexRouter = require('./routes/index.router');
var usersRouter = require('./routes/Users.router');
var adminRouter = require('./routes/Admin.router');
var ccdRouter = require('./routes/CCD.router');

var app = express();
var server = require('http').createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ccd', ccdRouter);
// app.use('/admin', adminRouter);


server.listen(process.env.PORT || '3500', () => {
  console.log('Listening on port 3500');
});


module.exports = app;
