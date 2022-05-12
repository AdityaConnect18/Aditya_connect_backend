const mongoose = require('mongoose')
const userModel = require('../Models/Users.model')
const passport = require('passport')
const nodemailer = require('nodemailer')
const roleModel = require('../Models/Role.model')
const postModel = require('../Models/Feed.model')
const messageModel = require('../Models/Message.model')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kurrucharan987@gmail.com',
        pass: '@Charan1234'
    }
});

module.exports = {
    async register(req, res) {
        var user = new userModel();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.createdAt = new Date();
        // console.log(user)
        await userModel.findOne({ email: req.body.email })
            .then((record) => {
                if (record)
                    return res.status(200).json({ message: 'Already registered with tuis email', record });
                else {
                    user.save((err, doc) => {
                        if (!err) res.status(200).send({ message: "user created successfully", doc });
                        else {
                            res.status(422).send({ message: 'Something went wrong !', err });
                        }
                    });
                }
            })
            .catch((err) => {
                res.status(400).json({ message: 'went wrong with registration !' });
            });


    },

    async login(req, res) {
        console.log(req.body);
        passport.authenticate('local', (err, user, info) => {
            // error from passport middleware

            if (err) return res.status(400).json(err);
            // registered user

            else if (user) {
                userModel.find({ _id: user._id }).select('-password')
                    .populate('courseId')
                    .populate('collegeId', '-departments')
                    .populate('roleId')
                    .populate('departmentId')
                    .populate('roleId')
                    .then(result => {
                        return res.status(200)
                            .json(
                                {
                                    message: info.message,
                                    token: user.generateJwt(),
                                    userRecord: result
                                });
                    })
                    .catch(err => { return res.status(500).json(err) })
            }
            // unknown user or wrong password
            else return res.status(202).json(info);
        })(req, res);
    },

    async updateUserData(req, res) {
        console.log(req.body)
        let data = req.body;
        console.log(data);
        let dbres;
        if (req.body.fullName && req.body.email) {
            dbres = userModel.updateOne({ _id: data.id },
                {
                    $set: {
                        fullName: data.fullName,
                        email: data.email,
                        rollNumber: data.rollNumber,
                        collegeId: data.collegeId,
                        courseId: data.courseId,
                        departmentId: data.deptId,
                        mobileNumber: data.mobileNumber,
                        isNewUser: false,
                    }
                })
        }
        else {
            dbres = userModel.updateOne({ _id: data.id },
                {
                    $set: {
                        rollNumber: data.uId,
                        collegeId: data.collegeId,
                        courseId: data.courseId,
                        departmentId: data.deptId,
                        mobileNumber: data.mobileNumber,
                        isNewUser: false,
                        roleId: data.roleId
                    }
                })
        }
        dbres.then(result => {
            userModel.findOne({ _id: data.id })
                .populate('courseId')
                .populate('collegeId', '-departments')
                .populate('roleId')
                .populate('departmentId')
                .populate('roleId')
                .then(user => {
                    res.status(200).json({ message: 'Details updated successfully', token: user.generateJwt(), userRecord: user });
                })
        })
            .catch(err => { res.status(400).json({ message: 'error occured in updating details' }); })

    },

    async getAllUsers(req, res) {
        try {
            var users = await userModel.find({}).select('-password').populate('courseId')
                .populate('collegeId', '-departments')
                .populate('roleId')
                .populate('departmentId')
            return res.status(200).json({ message: 'All faculties details', users });
        }
        catch (err) {
            res.status(400).json({ message: 'somethingwent wrong with retriving !', err });
        }
    },

    async addUser(req, res) {
        var user = new userModel();
        user = req.body;
        console.log(user);
        userModel.create(user)
            .then(result => {
                res.status(200).json({ message: 'user added successfully !', result });
            })
            .catch(err => { console.log(err); });
    },

    async addUserRole(req, res) {
        var role = req.body;
        roleModel.insertMany(role)
            .then(result => {
                res.status(200).json({ message: 'role added successfully !', result });
            })
            .catch(err => { console.log(err); });
    },

    async getUserbyId(req, res) {
        console.log(req.params);
        userModel.find({ _id: req.params.id }).select('-password')
            .populate('courseId')
            .populate('collegeId', '-departments')
            .populate('roleId')
            .populate('departmentId')
            .populate('messagesList')
            .populate('roleId')
            .then(result => { return res.status(200).json(result) })
            .catch(err => { return res.status(500).json(err) })
    },
    async fetchPosts(req, res) {
        console.log(req.query)
        let { channelId, pageNumber, limit } = req.query;
        pageNumber = (pageNumber - 1) * limit;
        postModel.find({}) //channelList: { $in: [channelId] }
            .populate('postedBy', '-channelList -postsId')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(pageNumber))
            .exec()
            .then(result => {
                setTimeout(() => {
                    return res.status(200).send({ "message": "fetched successfuly", result })
                }, 3000);
            })
            .catch(err => { console.log(err) })
    },
    removeUser(req, res) {
        console.log(req.params)
        let { id } = req.params
        userModel.deleteOne({ _id: id })
            .then(data => {
                res.status(200).json({ message: 'user removed successfully', data })
            })
            .catch(err => { console.log(err); });
    },
    postMessage(req, res) {
        oneMessage = new messageModel();
        oneMessage = req.body
        oneMessage.createdAt = new Date()
        messageModel.create(oneMessage)
            .then(data => {
                userModel.findOneAndUpdate({ _id: oneMessage.postedBy }, {
                    $push: { messagesList: data._id }
                })
                    .then(updated => {
                        res.status(200).json({ message: 'post added successfully', data })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => { console.log(err) });
    },
    getMessages(req, res) {
        console.log(req.params)
        messageModel.find({ postedBy: req.params.id })
            .sort({ createdAt: -1 })
            .then(posts => {
                res.status(200).json({ message: 'posts fetched successfully', posts })
            })
            .catch(err => console.log(err))
    }
};