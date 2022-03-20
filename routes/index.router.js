var express = require('express');
var router = express.Router();

var userCtrl = require('../Controllers/User.controller')
var ccdCtrl = require('../Controllers/CCD.controller')
var evCtrl = require('../Controllers/Email.Verify')
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/getfaculty', userCtrl.getAllfaculty);
router.post('/addCourse', ccdCtrl.addCourse);
router.post('/verifyEmail', evCtrl.verifyMail);
router.get('/emailVerifyResponse/:jwtToken', evCtrl.verifyMailResponse)
module.exports = router;
