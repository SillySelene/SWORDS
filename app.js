var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

dotenv.config();

var clangRouter = require('./routes/tools');

var miscRouter = require('./routes/misc');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', miscRouter);
app.use('/tools', clangRouter);

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
  next(createError(404));
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

app.listen(5000, () => {
  console.log("check localhost:5000 or smth");
})

module.exports = app;
