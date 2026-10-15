var express = require('express');
var router = express.Router();
const {login} = require('../controllers/authController.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"h": ""});
});

router.get('/health', function(req, res, next) {
  res.send({"status" : "alive"});
})

router.post('/login', login);

module.exports = router;
