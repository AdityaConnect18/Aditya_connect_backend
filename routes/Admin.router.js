// ENDPOINT = '/admin/*'

var express = require('express');
var router = express.Router();

var adminCtrl = require('../Controllers/Admin.controller')
router.post('/addAdmin', adminCtrl.addAdmin)
router.get('/get-admins', adminCtrl.getAdmins)
router.post('/login', adminCtrl.login)
router.post('/publishpost', adminCtrl.publishPost)
module.exports = router;