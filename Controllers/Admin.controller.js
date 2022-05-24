const AdminModel = require('../Models/Admin.model')
const postModel = require('../Models/Feed.model')
const roleModel = require('../Models/Role.model')
const messagesModel = require('../Models/Message.model')
const userModel = require('../Models/Users.model')
const { Expo } = require('expo-server-sdk')
module.exports = {

    async login(req, res) {
        console.log(req.body)
        AdminModel.findOne({ email: req.body.userId })
            .then(result => {
                console.log(result);
                if (result == null)
                    res.status(200).json({ "message": "Admin not found Please login" });
                else {
                    res.status(200).json({ 'message': 'Login successfull', 'token': result.generateJwt(), result });
                }
            })
            .catch(err => { console.log(err) })
    },

    async addAdmin(req, res) {
        var admin = new AdminModel();
        admin = req.body;
        // console.log(admin);
        if (admin._id == undefined) {
            AdminModel.create(admin)
                .then(result => {
                    res.status(200).json({ message: 'Admin added successfully !', result });
                })
                .catch(err => { console.log(err); });
        }
        else {
            AdminModel.findOneAndUpdate({ _id: admin._id }, admin)
                .then(result => {
                    res.status(200).json({ message: 'Updated admin successfully !', result });
                })
                .catch(err => { console.log(err); });
        }
    },

    async getAdmins(req, res) {
        AdminModel.find({})
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

    //Todo push notifications to users
    async publishPost(req, res) {
        let expo = new Expo();
        console.log(req.body)
        let post = new postModel();
        post = req.body;
        post.createdAt = new Date();
        try {
            let postResult = await postModel.create(post)
            if (postResult) {
                //  1) update the admin who has posted
                //  2)push notifications to users who belong to that colleges
                AdminModel.updateOne({ _id: result.postedBy }, { $push: { postsId: result._id } })
                let users = await userModel
                    .find({ collegeId: { $in: req.body.channelList } })
                let userNotificationIds = users
                    .filter(eachUser => eachUser.notificationId.length > 1)
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
                            console.log(ticketChunk);
                            tickets.push(...ticketChunk);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })();

            }
        } catch (error) {
            console.log(error.message)
        }

    },

    async getRoles(req, res) {
        roleModel.find({})
            .then(data => {
                res.status(200).json({ message: 'Roles fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    async removeVolunteer(req, res) {
        console.log(req.params)
        let { id } = req.params;
        AdminModel.deleteOne({ _id: id })
            .then(data => {
                res.status(200).json({ message: 'Volunteers removed successfully', data })
            })
            .catch(err => { console.log(err); });

    },

    getMessages(req, res) {
        messagesModel.find({})
            .then(data => {
                res.status(200).json({ message: 'Messages fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    getPosts(req, res) {
        postModel.find({})
            .then(data => {
                res.status(200).json({ message: 'Posts fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    }

};