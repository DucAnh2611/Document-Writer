var express = require('express');
const { auth } = require('../lib/jwt');
const { get, info, create, update, remove } = require('../lib/mongodb/document');
const config = require('../config');
const { status } = require('../lib/mongodb');
var router = express.Router();

/* GET users listing. */
router.post('/create', auth, function(req, res, next) {
  let { user } = req.user;
  create(user.id).then(data => {
    res.json({status: "ok", data: data.data});
  });
});

router.post('/update', auth, function(req, res, next) {
  let { user } = req.user;
  let { doc } = req.body;
  update(user.id, doc).then(data=> {

    if(data.status.NOT_FOUND) res.status(401).json({status: "fail", message: "zero"});
    else res.json({status: "ok", data: data.data.doc});
    
  }); 
});

router.get('/list', auth, function(req, res, next) {
  let { user } = req.user;
  let { 
    key ="", 
    page = 1, 
    limit = config.db_option.limit
  } = req.query;

  get(user.id, key, page, limit).then(data => {
    res.json({status: "ok", data: data.data});
  });
});

router.get('/:docid/info', auth, function(req, res, next) {
  let { user } = req.user;
  let { docid } = req.params;

  info(user.id, docid).then(data => { 
    switch(data.status) {
      case status.NOT_FOUND:
        res.status(401).json({status: "fail", message: "zero"});
        break;
      case status.NOT_VALID:
        res.status(401).json({status: "fail", message: "sql"});
        break;
      case status.OK:
        res.json({status: "ok", data: data.data.info});
        break;
    }
  });
});

router.delete('/:docid', auth, function(req, res, next) {
  let { user } = req.user;
  let { docid } = req.params;

  remove(user.id, docid).then(data => { 
    switch(data.status) {
      case status.NOT_FOUND:
        res.status(401).json({status: "fail", message: "zero"});
        break;
      case status.NOT_VALID:
        res.status(401).json({status: "fail", message: "sql"});
        break;
      case status.OK:
        res.json({status: "ok"});
        break;
    }
  })
});

module.exports = router;
