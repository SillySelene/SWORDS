var express = require('express');
var {getDocsAll, getDocById, getDocsByCategoryId, getDocsByToolId, getCategoryAll, getCategoryById} = require('../controllers/docController.js');

var router = express.Router();

router.get('/', getDocsAll);
router.get('/:id', getDocById);
router.get('/c/:id', getDocsByCategoryId);
router.get('/t/:id', getDocsByToolId);

router.get('/category', getCategoryAll);
router.get('/category/:id', getCategoryById);

module.exports = router;
