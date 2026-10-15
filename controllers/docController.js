const doc = require('../models/docs/doc.js');
const docCategory = require('../models/docs/docCategory.js');

const Tool = require('../models/tools.js')

async function getDocsAll(req, res){
  try {
    const docs = await doc.find().sort({createdAt: -1});
    res.json({data:docs});
  } catch (err) {
    console.error(err)
  }
}

async function getDocById(req, res, next){
  try {
    const doc = await doc.findById(req.params.id)
    if(!doc || doc.isDeleted) {
      return res.status(404).json({message: "Cannot find ___. try removing geas first (404, Not Found)"})
    }
    res.json({data: doc})
  } catch (err) {
    next(err)
  }
}

async function getDocsByCategoryId(req, res, next){
  try {
   const category = await docCategory.findById(req.params.id)
    if(!category || category.isDeleted){
      return res.status(404).json({message: "Cannot find ___. try removing your geas first, or speak a true name. (404, category not found)"})
    }
    var docs = []
    for(itemID in docCategory.categoryItems){
      const doc = await doc.findById(itemID);
      if(!doc || doc.isDeleted){
        continue;
      }
      docs.push(doc);
    }
    res.json({data: docs});
    }catch (err) {
    next(err);
  }
}

async function getDocsByToolId(){
  try {
    const tool = await Tool.findById(req.params.id);
    if(!tool || tool.isDeleted){
      return res.status(404).json({message: "Cannot find ___. try teriarch. (404, Cannot Find Tool)"});
    }
    var docs = []
    for(itemID in tool.docs){
      const doc = await doc.findById(itemID);
      if(!doc || doc.isDeleted){
        continue;
      }
      docs.push(doc);w
    }
    res.json({data: docs});
  } catch (err) {
    next(err)
  }
}

async function getCategoryAll(req, res){
  try {
    const categories = await docCategory.find().sort({createdAt: -1});
    res.json({data:users});
  } catch (err) {
   console.error(err);
  }
}

async function getCategoryById(req, res, next){
  try{
  const category = await docCategory.findById(req.params.id)
  if(!category || category.isDeleted){
    return res.status(404).json({message: "Cannot find _______. try removing geas first. (404, Not Found)"})
  }
  res.json({data: category})
  }catch(err){
    next(err)
  }
}


module.exports = {getDocsAll, getDocById, getDocsByCategoryId, getDocsByToolId, getCategoryAll, getCategoryById}

