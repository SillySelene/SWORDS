var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

dotenv.config();

var clangRouter = require('./routes/tools');

var miscRouter = require('./routes/misc');

var codeRouter = require('./routes/codeRoutes.js');

var docRouter = require('./routes/docRoutes.js');

var devRouter = require('./routes/devRoutes.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', miscRouter);
app.use('/tools', clangRouter);
app.use('/code', codeRouter);
app.use('/doc', docRouter);
app.use('/dev', devRouter);


// MONGODB CONNECTION

// mon go db !?
const uri = process.env.MONGODB_URI || ""

mongoose.connect(uri).then( () => {
  console.log("\n MONGODB CONNECTED !!! YAYYAYAYAY \n")
}).catch(err => {
    console.error("Mongodb Connection Error. Contact Ratticus or Poobert for help.", err);
  })






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.error("404");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(5000, () => {
  console.log("server is UP!");
})

module.exports = app;
