var express = require('express');
var router = express.Router();

var {requireAuth} = require('../middleware/authMiddleware.js');

var {
    createTool, updateTool, deleteTool, 
  createSnippet, updateSnippet, deleteSnippet, 
  createDoc, updateDoc, deleteDoc,
  createCodeCategory, updateCodeCategory, deleteCodeCategory, 
  createDocCategory, updateDocCategory, deleteDocCategory,
  createUser, deleteUser
} = require('../controllers/devController.js');

router.use(requireAuth);



router.post('/tool', createTool);
router.patch('/tool', updateTool);
router.delete('/tool', deleteTool);

router.post('/snippet', createSnippet);
router.patch('/snippet', updateSnippet);
router.delete('/snippet', deleteSnippet);

router.post('/doc', createDoc);
router.patch('/doc', updateDoc);
router.delete('/doc', deleteDoc);

router.post('/c-category', createCodeCategory);
router.patch('/c-category', updateCodeCategory);
router.delete('/c-category', deleteCodeCategory);

router.post('/d-category',  createDocCategory);
router.patch('/d-category', updateDocCategory);
router.delete('/d-category', deleteDocCategory);

router.post('/user', createUser);
router.delete('/user', deleteUser);


module.exports = router;
