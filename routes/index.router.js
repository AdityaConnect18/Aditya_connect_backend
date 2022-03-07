var express = require('express');
var router = express.Router();

var facultyctrl = require('../Controllers/Faculty.controller')

router.post('/register', facultyctrl.register);
router.post('/login', facultyctrl.login);
router.get('/getfaculty', facultyctrl.getAllfaculty);

module.exports = router;
