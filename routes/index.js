var express = require('express');
var router = express.Router();
var path = require('path');

/**
* Just serves the index page on the root url
*/
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
