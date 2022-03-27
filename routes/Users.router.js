// ENDPOINT = '/users/*'

var express = require('express');
var router = express.Router();

var userCtrl = require('../Controllers/User.controller')
var evCtrl = require('../Controllers/Email.Verify')

router.get('/get-users', userCtrl.getAllUsers);

router.post('/verifyEmail', evCtrl.verifyMail);
router.get('/emailVerifyResponse/:jwtToken', evCtrl.verifyMailResponse)

router.post('/addUser', userCtrl.addUser);
router.post('/addRole', userCtrl.addUserRole);

module.exports = router;
