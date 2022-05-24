// ENDPOINT = '/admin/*'

var express = require('express');
var router = express.Router();

var adminCtrl = require('../Controllers/Admin.controller')
router.post('/addAdmin', adminCtrl.addAdmin)
router.get('/get-admins', adminCtrl.getAdmins)
router.post('/login', adminCtrl.login)
router.post('/publishpost', adminCtrl.publishPost)
router.get('/get-roles', adminCtrl.getRoles);
router.delete('/remove-volunteer/:id', adminCtrl.removeVolunteer);
router.get('/get-messages', adminCtrl.getMessages)
router.get('/get-posts', adminCtrl.getPosts)
router.get('get-admin/:id', adminCtrl.getAdminById)
//Todo
// post == >edit, delete
module.exports = router;