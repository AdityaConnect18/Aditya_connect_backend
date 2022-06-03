const adminModel = require('../Models/Admin.model')
const postModel = require('../Models/Feed.model')
const roleModel = require('../Models/Role.model')
const messagesModel = require('../Models/Message.model')
const userModel = require('../Models/Users.model')
const { Expo } = require('expo-server-sdk')
const { uploadFile } = require('./S3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
module.exports = {

    // for admin login
    async login(req, res) {
        console.log(req.body)
        adminModel.findOne({ email: req.body.userId })
            .then(result => {
                console.log(result);
                if (result && result.verifyPassword(req.body.password)) {
                    res.status(200).json({ 'message': 'Login successfull', 'token': result.generateJwt(), result })
                }
                else {
                    res.status(200).json({ 'message': 'Invalid credentials' })
                }
            })
            .catch(err => { console.log(err) })
    },

    // for creating and updating admin record
    async upsertAdmin(req, res) {
        var admin = new adminModel();
        admin = req.body;
        // for creating new admin record
        if (admin._id == undefined) {
            adminModel.create(admin)
                .then(result => {
                    res.status(200).json({ message: 'Admin added successfully !', result });
                })
                .catch(err => { console.log(err); });
        }
        // for updating the admin record
        else {
            adminModel.findOneAndUpdate({ _id: admin._id }, admin)
                .then(result => {
                    res.status(200).json({ message: 'Updated admin successfully !', result });
                })
                .catch(err => { console.log(err); });
        }
    },

    //fetching all admins
    async getAdmins(req, res) {
        adminModel.find({})
            .populate('channelList')
            .populate('collegeId', '-departments')
            .populate('DeptId')
            .populate('courseId')
            .select("-password")
            .select("-saltSecret")
            .then(data => {
                res.status(200).json({ message: 'Volunteers fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    //fetching admin by Id
    async getAdminById(req, res) {
        adminModel.find({ _id: req.params.id })
            .populate('channelList')
            .populate('collegeId', '-departments')
            .populate('DeptId')
            .populate('courseId')
            .select("-password")
            .select("-saltSecret")
            .then(data => {
                res.status(200).json({ message: 'Admin fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    //Todo push notifications to users
    async publishPost(req, res) {
        let expo = new Expo()
        console.log(req.file)
        let mediaFile = req.file
        // console.log("here is the req body", req.body)
        // console.log(typeof req.body.channelList)
        let channelList;
        try {
            console.log(req.body)
            channelList = req.body.channelList.split(',')
            // console.log(channelList)
        } catch (error) {
            console.log(error.message)
        }
        // 1) Send the image to aws s3 and get the public link
        const result = await uploadFile(mediaFile)
        await unlinkFile(mediaFile.path)
        console.log(result);


        // creating post body
        let post = new postModel();
        post = req.body;
        post.mediaId = result.Location
        post.createdAt = new Date()
        post.channelList = channelList
        // console.log(post);
        try {
            let postResult = await postModel.create(post)
            console.log(postResult)
            if (postResult) {
                //  1) update the admin who has posted
                //  2)push notifications to users who belong to that colleges
                adminModel.updateOne({ _id: postResult.postedBy }, { $push: { postsId: postResult._id } })
                let users = await userModel
                    .find({ collegeId: { $in: req.body.channelList } })
                console.log(users)
                let userNotificationIds = users
                    .filter(eachUser => eachUser.notificationId?.length > 1)
                    .map(eachUser => eachUser.notificationId)
                console.log(userNotificationIds)

                // 2.1) validating notificationId and creating message
                let messages = []
                for (let pushToken of userNotificationIds) {

                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token`);
                        continue;
                    }
                    //Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                    messages.push({
                        to: pushToken,
                        sound: 'default',
                        body: postResult.postTitle,
                        data: postResult,
                    })
                }

                //2.3) Sending notiofications in chunks

                let chunks = expo.chunkPushNotifications(messages);
                let tickets = [];
                (async () => {
                    for (let chunk of chunks) {
                        try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            console.log("displaying ticket chunk", ticketChunk);
                            tickets.push(...ticketChunk);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })();
                return res.send(postResult)

            }
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }

    },

    // fetching all roles 
    async getRoles(req, res) {
        roleModel.find({})
            .then(data => {
                res.status(200).json({ message: 'Roles fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    //removinig a volunteer from database
    async removeVolunteer(req, res) {
        console.log(req.params)
        let { id } = req.params;
        adminModel.deleteOne({ _id: id })
            .then(data => {
                res.status(200).json({ message: 'Volunteers removed successfully', data })
            })
            .catch(err => { console.log(err); });

    },

    // fetching all  messages posted by users from app
    async getAllMessages(req, res) {
        messagesModel.find({})
            .sort({ createdAt: -1 })
            .populate('postedBy')
            .then(data => {
                res.status(200).json({ message: 'Messages fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    //fetching all posts
    async getAllPosts(req, res) {
        postModel.find({})
            .sort({ createdAt: -1 })
            .populate('categoryId')
            .populate('postedBy')
            .then(data => {
                res.status(200).json({ message: 'Posts fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    //returns posts that are posted by a specific admin whose adminId is passed
    async getPostsByAdminId(req, res) {
        postModel.find({ postedBy: req.params.adminId })
            .sort({ createdAt: -1 })
            .populate('postedBy')
            .populate('categoryId')
            .populate('channelList')
            .then(result => {
                return res.status(200).json({ message: "posts fetched succesfully", posts: result })
            })
            .catch(err => console.error(err))
    },

    //updating the post
    async updatePost(req, res) {
        let post = new postModel()
        post = req.body
        postModel.findOneAndUpdate({ _id: post.id }, post)
            .then(result => {
                res.status(200).json({ message: 'Updated post successfully !', result });
            })
            .catch(err => { console.log(err); });
    },

    // deleting the post 
    async deletePost(req, res) {
        var { postId } = req.params
        postModel.deleteOne({ _id: postId })
            .then(data => {
                res.status(200).json({ message: 'posts removed successfully', data })
            })
            .catch(err => { console.log(err); });
    }

};