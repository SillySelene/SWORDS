var mongoose = require('mongoose');
var codeEX = require('./codeSnippet.js');

const codeCategorySchema = new mongoose.Schema({
  "categoryName" : {type: String, required:true},
  "categoryItems" : [{type: String],
})

module.exports = mongoose.model('Schema', codeCategorySchema);

