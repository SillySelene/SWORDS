var express = require('express');
var router = express.Router();
var {getSnippetsAll,
     getSnippetById, 
     getSnippetsByCategoryId, 
     getSnippetsByToolId, 
     getCategoryAll, 
     getCategoryById
} = require('../controllers/codeController.js');


router.get('/', getSnippetsAll);
router.get('/:id', getSnippetById);
router.get('/t/:id', getSnippetsByToolId);
router.get('/c/:id', getSnippetsByCategoryId);

router.get('/category', getCategoryAll);
router.get('/category/:id', getCategoryById);

module.exports = router;
