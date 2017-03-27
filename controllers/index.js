var express = require('express')
  , router = express.Router();

var path = "/api/v1/";

router.use(path + '/users', require('./users'));
  
module.exports = router;