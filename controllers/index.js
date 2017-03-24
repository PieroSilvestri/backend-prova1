var express = require('express')
  , router = express.Router();

var path = "/api";

router.use(path + '/users', require('./users'));
  
module.exports = router;