var express = require('express');
const { auth } = require('../lib/jwt');
const { regis, login } = require('../lib/mongodb/user');
const { status } = require('../lib/mongodb');
const config = require('../config');
var router = express.Router();

/* GET users listing. */
router.post('/signup', async (req, res, next) => {
  regis(req.body).then(data => {
    if(data.status === status.SAME) res.status(401).json({status: "fail", message: "Same username"});

    res.json({status: "ok"});
  });
});

router.post('/login', async (req, res, next) => {
  login(req.body).then(data => {
    switch(data.status) {
      case status.NOT_FOUND:
        res.status(401).json({status: "fail", message: "user"});
        break;
      case status.NO_PERMISSION:
        res.status(401).json({status: "fail", message: "password"});
        break;
      case status.NOT_VALID: 
        res.status(401).json({status: "fail", message: "sql"});
        break;
      case status.OK:
        res.cookie(config.cookie, JSON.stringify({
          token: data.data.token
        }));
        res.json({status: "ok", data: data.data.info});

        break;
    }
  });
});

module.exports = router;
