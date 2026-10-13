var mongoose = require('mongoose');
var Tool = require('../tools.js');
var Category = require('./docCategory.js')

const docSchema = new mongoose.Schema({
  "docName" : {type: String, required:true},
  "tool" : Tool,
  "docText" : {type: String, required: true}, 
  
})

module.exports = mongoose.model('Schema', docSchema);

