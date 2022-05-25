// ENDPOINT = '/admin/*'

var express = require('express');
var router = express.Router();

var adminCtrl = require('../Controllers/Admin.controller')
router.post('/addAdmin', adminCtrl.upsertAdmin)
router.get('/get-admins', adminCtrl.getAdmins)
router.post('/login', adminCtrl.login)
router.post('/publishpost', adminCtrl.publishPost)
router.get('/get-roles', adminCtrl.getRoles);
router.delete('/remove-volunteer/:id', adminCtrl.removeVolunteer);
router.get('/get-messages', adminCtrl.getAllMessages)
router.get('/get-posts', adminCtrl.getAllPosts)
router.get('/get-admin/:id', adminCtrl.getAdminById)
router.get('/get-admin-posts/:adminId', adminCtrl.getPostsByAdminId)
//Todo
// post ==> edit, delete
module.exports = router;