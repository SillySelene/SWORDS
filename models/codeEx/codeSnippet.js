var mongoose = require('mongoose');
var Tool = require('../tools.js')

const codeSnippet = new mongoose.Schema({
  "snippetName" : {type: String, required:true},
  "snippet" : {type:String, required:true},
  "tool" : {type:String},
  "categories" : [{type:String}],
},{timestamps:true})


module.exports = mongoose.model('codeSnippet', codeSnippet);
