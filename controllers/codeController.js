const codeSnippet = require('../models/codeEx/codeSnippet.js')
const codeCategory = require('../models/codeEx/codeCategory.js')
const Tool = require('../models/tools.js')

async function getSnippetsAll(req, res){
  try {
    const snippets = await codeSnippet.find().sort({createdAt: -1});
    res.json({data:snippets});
  } catch (err) {
    console.error(err)
  }
}






async function getSnippetById(req, res, next){
  try {
    const snippet = await codeSnippet.findById(req.params.id)
    if(!snippet || snippet.isDeleted) {
      return res.status(404).json({message: "Cannot find ___. try removing geas first (404, Not Found)"})
    }
    res.json({data: snippet})
  } catch (err) {
    next(err)
  }
}


async function getSnippetsByCategoryId(req, res, next){
  try {
   const category = await codeCategory.findById(req.params.id)
    if(!category || category.isDeleted){
      return res.status(404).json({message: "Cannot find ___. try removing your geas first, or speak a true name. (404, category not found)"})
    }
    var snippets = []
    for(itemID in codeCategory.categoryItems){
      const snippet = await codeSnippet.findById(itemID);
      if(!snippet || snippet.isDeleted){
        continue;
      }
      snippets.push(snippet);
    }
    res.json({data: snippets});
    }catch (err) {
    next(err);
  }
}

async function getSnippetsByToolId(){
  try {
    const tool = await Tool.findById(req.params.id);
    if(!tool || tool.isDeleted){
      return res.status(404).json({message: "Cannot find ___. try teriarch. (404, Cannot Find Tool)"});
    }
    var snippets = []
    for(itemID in tool.snippets){
      const snippet = await codeSnippet.findById(itemID);
      if(!snippet || snippet.isDeleted){
        continue;
      }
      snippets.push(snippet);w
    }
    res.json({data: snippets});
  } catch (err) {
    next(err)
  }
}




async function getCategoryAll(req, res){
  try {
    const categories = await codeCategory.find().sort({createdAt: -1});
    res.json({data:users});
  } catch (err) {
   console.error(err);
  }
}

async function getCategoryById(req, res, next){
  try{
  const category = await codeCategory.findById(req.params.id)
  if(!category || category.isDeleted){
    return res.status(404).json({message: "Cannot find _______. try removing geas first. (404, Not Found)"})
  }
  res.json({data: category})
  }catch(err){
    next(err)
  }
}


module.exports = {getSnippetsAll, getSnippetById, getSnippetsByCategoryId, getSnippetsByToolId, getCategoryAll, getCategoryById}
