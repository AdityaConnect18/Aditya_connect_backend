// ENDPOINT = '/users/*'

var express = require('express');
var router = express.Router();

var userCtrl = require('../Controllers/User.controller')
var evCtrl = require('../Controllers/Email.Verify')

router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.post('/update-details', userCtrl.updateUserData);
router.get('/get-user/:id', userCtrl.getUserbyId)
router.get('/get-users', userCtrl.getAllUsers);

router.post('/verifyEmail', evCtrl.verifyMail);
router.get('/emailVerifyResponse/:jwtToken', evCtrl.verifyMailResponse)

router.post('/addUser', userCtrl.addUser);
router.post('/addRole', userCtrl.addUserRole);
router.get('/fetchposts', userCtrl.fetchPosts)
router.delete('/remove-user/:id', userCtrl.removeUser)
module.exports = router;
