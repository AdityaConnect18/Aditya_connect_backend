// ENDPOINT = '/admin/*'

var express = require('express');
var router = express.Router();
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + "---" + file.originalname)
    }
})

const upload = multer({ storage: storage })

var adminCtrl = require('../Controllers/Admin.controller')
router.post('/addAdmin', adminCtrl.upsertAdmin)
router.get('/get-admins', adminCtrl.getAdmins)
router.post('/login', adminCtrl.login)
router.post('/publishpost', upload.single('selectedFile'), adminCtrl.publishPost)
router.get('/get-roles', adminCtrl.getRoles);
router.delete('/remove-volunteer/:id', adminCtrl.removeVolunteer);
router.get('/get-messages', adminCtrl.getAllMessages)
router.get('/get-posts', adminCtrl.getAllPosts)
router.get('/get-admin/:id', adminCtrl.getAdminById)
router.get('/get-admin-posts/:adminId', adminCtrl.getPostsByAdminId)
//Todo
// post ==> edit, delete
module.exports = router;