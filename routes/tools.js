var express = require('express');
var router = express.Router();
var Tool = require('../models/tools.js');
var mongoose = require('mongoose');
/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    console.log("hai")
    const tools = await Tool.find().sort({createdAt: -1})
    res.json({data:tools})
  } catch (error) {
    console.error(error)
  }
});

 router.post('/', async function(req, res, next) {
  const {toolName} = req.body;
  await Tool.create({toolName});
  res.send('tool created(?)')
})

module.exports = router;
