const express = require('express');
const status = express.Router();

status.get('/', function(req, res) {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	res.send(healthcheck);
});

module.exports = status;