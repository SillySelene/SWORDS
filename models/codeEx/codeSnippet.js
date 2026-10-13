var mongoose = require('mongoose');
var Tool = require('../tools.js')

const codeSnippet = new mongoose.Schema({
  "snippetName" : {type: String, required:true},
  "snippet" : {type:String, required:true},
  "tool" : {type:String, required:true}
})


module.export = mongoose.model('Snippet', codeSnippet);
