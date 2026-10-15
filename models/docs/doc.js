var mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  "docName" : {type: String, required:true},
  "tool" : {type: String, required:true},
  "category" : {type: String, required:true},
  "docText" : {type: String, required: true}, 
  
}, {timestamps:true})

module.exports = mongoose.model('doc', docSchema);

