// ENDPOINT = '/admin/*'

var express = require('express');
var router = express.Router();

var adminCtrl = require('../Controllers/Admin.controller')
router.post('/addAdmin', adminCtrl.addAdmin)
router.post('/login', adminCtrl.login)
module.exports = router;