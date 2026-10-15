const tool = require('../models/tools.js');
const codeSnippet = require('../models/codeEx/codeSnippet.js');
const codeCategory = require('../models/codeEx/codeCategory.js');
const doc = require('../models/docs/doc.js');
const docCategory = require('../models/docs/doc.js');
var bcrypt = require('bcryptjs');

/*
 *
 *
 * TODO: WRITE POST, PUT AND DELETE CLASSES FOR:
 * TOOL - POST, PUT, DELETE
 * CODESNIPPET - POST, PUT, DELETE
 * CODECATEGORY - POST, PUT, DELETE
 * DOCCATEGORY - POST, PUT, DELETE
 * USER - POST, PUT, DELETE
 *
 */

async function createTool(req, res, next){
  try {
   const {toolName} = req.body;

    if(!toolName){
      return res.status(400).json({error:"Tool needs a name, sorry!"})
    }

    var newTool = tool.create({
      toolName: toolName
    })

    return res.json({data:newTool})
  } catch (err) {
    next(err); 
  }
}

async function updateTool(req, res, next){
  try {
    const {oldToolName, toolName, snippets, documents} = req.body;

    if(!toolName){
      return res.status(400).json({error:"Tool needs a name, sorry!!!"})
    }

    var updateTool = tool.findOneAndReplace({toolName: oldToolName}, {toolName: toolName, snippets:snippets, documents:documents});

    res.json({data: updateTool});

  } catch (err) {
    next(err);
  }
}

async function deleteTool(req, res, next){
  try {
    const targetId = req.params.id
    
    const deletedTool = await tool.findByIdAndDelete(targetId);
    if(!deletedTool){
      return res.status(403).json({error: "no user"})
    }
    
    await codeSnippet.deleteMany({tool: targetId});
    await doc.deleteMany({tool:targetId});
    res.json({data:deletedTool})
  } catch (err) {
    next(error)
  }
}

async function createSnippet(req, res, next){
  try {
    const {snippetName, snippet, tool, categories} = req.body;

    if(!snippetName || !snippet || !tool || !categories){
      res.status(400).json({error: "missing one of the required paramaters for creating a code snippet"});
    }

    var newSnippet = codeSnippet.create({
      snippetName: snippetName,
      snippet: snippet,
      tool: tool,
      categories: categories
    })

    res.json({data:newSnippet});
    
  } catch (err) {
    next(err);
  }
}

async function updateSnippet(req, res, next){
  try {
   const {snippetName, snippet, tool, categories} = req.body;

    if(!snippetName || !snippet || !tool || !categories){
      res.status(400).json({error:"missing one of the required paramaters"})
    }

    var updatedSnippet = codeSnippet.findOneAndReplace({snippetName: snippetName}, {
      snippetName:snippetName,
      snippet: snippet,
      tool: tool,
      categories: categories
    })

    res.json({data:updateSnippet});

  } catch (err) {
   next(err); 
  }
}

async function deleteSnippet(req, res, next){

  try {
    const targetId = req.params.id
    
    const deletedSnippet = await codeSnippet.findByIdAndDelete(targetId);
    if(!deletedSnippet){
      return res.status(403).json({error: "no user"})
    }
        res.json({data:deletedSnippet});

  } catch (err) {
    next(err)
  }
}

async function createDoc(req, res, next){
  try {
    const {docName, tool, category, docText} = req.body;

    if(!docName || !tool || !category || !docText){
      res.status(400).json({error: "missing one of the required paramaters to make a new document."})
    }

    var newDoc = doc.create({
      docName: docName,
      tool: tool,
      docCategory: category,
      docText: docText
    })

    res.json({data:newDoc})

  } catch (err) {
    next(err)
  }
}

async function updateDoc(req, res, next){
  try {
    const {docName, tool, category, docText} = req.body;
    if(!docName || !tool || !category || !docText){
      res.status(400).json({error: "missing one of the required params"});
    }

    var oldDoc = doc.findOneAndReplace({docName: docName}, {
      docName : docName,
      tool:  tool,
      category: category,
      docText: docText
    })

    res.json({data:oldDoc});

  } catch (err) {
    next(err);
  }
}

async function deleteDoc(req, res, next){
  try {
    const targetId = req.params.id
    
    const deletedDoc = await doc.findByIdAndDelete(targetId);
    if(!deletedDoc){
      return res.status(403).json({error: "no user"})
    }
        res.json({data:deletedDoc}); 
  } catch (err) {
    next(err);
  }
}

async function createCodeCategory(req, res, next){
  try {
    const {categoryName} = req.body;

    if(!categoryName){
      res.status(400).json({error: "incomplete data sent"});
    }

    var newCategory = await codeCategory.create({
      categoryName: categoryName,
    });

    res.status(201).json({data: newCategory});

 
  } catch (err) {
    bext(err);
  }
}

async function updateCodeCategory(req, res, next){
  try {
    const {categoryName, categoryItems} = req.body;
    if(!categoryName){
      res.status(400).json({error: 'incomplete data sent'});
    }

    var oldCategory = await codeCategory.findOneAndReplace({categoryName: categoryName}, {
      categoryName : categoryName,
      categoryItems : categoryItems
    });

    res.json({data: oldCategory});

  } catch (err) {
    next(err);
  }
}

async function deleteCodeCategory(req, res, next){
  try {
    const targetId = req.params.id
    
    const deletedCategory = await codeCategory.findByIdAndDelete(targetId);
    if(!deletedCategory){
      return res.status(403).json({error: "no user"})
    }
        res.json({data:deletedCategory});
  } catch (err) {
    next(err); 
  }
}

async function createDocCategory(req, res, next){
  try {
    const {categoryName} = req.body;

    if(!categoryName){
      res.status(400).json({error: "incomplete data sent"});
    }

    var newCategory = await docCategory.create({
      categoryName: categoryName,
    });

    res.status(201).json({data: newCategory});

  } catch (err) {
    next(err);
  }
}

async function updateDocCategory(req, res, next){
  try {
    const {categoryName, categoryItems} = req.body;
    if(!categoryName){
      res.status(400).json({error: 'incomplete data sent'});
    }

    var oldCategory = await docCategory.findOneAndReplace({categoryName: categoryName}, {
      categoryName : categoryName,
      categoryItems : categoryItems
    });

    res.json({data: oldCategory});

 
  } catch (err) {
    next(err);
  }
}

async function deleteDocCategory(req, res, next){
  try {
    const targetId = req.params.id
    
    const deletedCategory = await docCategory.findByIdAndDelete(targetId);
    if(!deletedCategory){
      return res.status(403).json({error: "no user"})
    }
        res.json({data:deletedCategory}); 
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next){
  try {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      res.status(400).json({error: "Missing required fields"})
    }

    var normalizedEmail = email.toLowerCase();
    var passwordHash = await bcrypt.hash(password, 12);

    const newUser = await user.create({
      name: name.trim(),
      email: email.trim(),
      password: passwordHash
    })

    res.status(201).json({
      data: newUser
    })

  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next){
  try {
    const targetId = req.params.id
    const deletedUser = await user.findByIdAndDelete(targetId);
    if(!deletedUser){
      return res.status(403).json({error: "no user"})
    }
        res.json({data:deletedUser});
  } catch (err) {
    next(err); 
  }
}

module.exports = {
  createTool, updateTool, deleteTool, 
  createSnippet, updateSnippet, deleteSnippet, 
  createDoc, updateDoc, deleteDoc,
  createCodeCategory, updateCodeCategory, deleteCodeCategory, 
  createDocCategory, updateDocCategory, deleteDocCategory,
  createUser, deleteUser
}
