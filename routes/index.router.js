var express = require('express');
var router = express.Router();

var userCtrl = require('../Controllers/User.controller')

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;
