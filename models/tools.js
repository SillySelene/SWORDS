var mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  "toolName" : {type: String, required:true},
  "snippets" : [{type: String}],
  "documents" : [{type: String}],
}, {timestamps:true})

module.exports = mongoose.model('Schema', toolSchema);
