var express = require('express');
const { get, create } = require('../lib/mongodb/document');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  create(1);
    
  res.render('index', { title: 'Express' });
});

module.exports = router;
