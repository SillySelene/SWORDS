var mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  "toolName" : {type: String, required:true},
  "snippets" : [{type: String}],
  "documents" : [{type: String}],
})

module.exports = mongoose.model('Schema', toolSchema);
