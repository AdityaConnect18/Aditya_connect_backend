
// ENDPOINT = 'ccd/*'

var express = require('express');
var router = express.Router();

var ccdCtrl = require('../Controllers/CCD.controller')
router.post('/addCourse', ccdCtrl.addCourse);
router.post('/addCollege', ccdCtrl.addCollege);
router.post('/addDepartment', ccdCtrl.addDepartment);
router.get('/get-colleges', ccdCtrl.fetchCollges);
router.post('/addCategory', ccdCtrl.addCategory);
router.get('/get-courses', ccdCtrl.getCourses);
module.exports = router;
