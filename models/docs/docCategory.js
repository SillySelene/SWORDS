var mongoose = require('mongoose');

const docCategorySchema = new mongoose.Schema({
  "categoryName" : {type: String, required:true},
  "categoryItems" : [{type: String}],
}, {timestamps: true})

module.exports = mongoose.model('docCategory', docCategorySchema);


