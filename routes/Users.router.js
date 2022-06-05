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
router.post('/addUser', userCtrl.addUser);
router.post('/addRole', userCtrl.addUserRole);
router.get('/fetchposts', userCtrl.fetchMyCollegePosts)
router.delete('/remove-user/:id', userCtrl.removeUser)
router.post('/post-message', userCtrl.postMessage)
router.get('/get-messages/:id', userCtrl.getMessagesByUserId)
router.post('/send-otp', userCtrl.sendOtpToEmail)
router.post('/update-password', userCtrl.updatePassword)
router.post('/get-institue-data', userCtrl.getInstitueData)
router.post('/like-or-dislike-post', userCtrl.likeOrDislikePost)
module.exports = router;


// can be used for email verification of user

// router.post('/verifyEmail', evCtrl.verifyMail);
// router.get('/emailVerifyResponse/:jwtToken', evCtrl.verifyMailResponse)