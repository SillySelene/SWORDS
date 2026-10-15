var mongoose = require('mongoose');

const User = new mongoose.Schema({
  "name" : {type: String, required:true, maxlength:80},
  "email" : {type: String, required:true, lowercase:true, trim:true},
  "passwordHash" : {type:String, required:true}
})


module.exports = mongoose.model('User', User);

