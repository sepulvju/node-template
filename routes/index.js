const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('My New Route!!!!');
});

module.exports = router;