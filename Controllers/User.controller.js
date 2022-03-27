const mongoose = require('mongoose')
const userModel = require('../Models/Users.model')
const passport = require('passport')
const nodemailer = require('nodemailer')
const roleModel = require('../Models/Role.model')

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
        // console.log(user)
        await userModel.findOne({ email: req.body.email })
            .then((record) => {
                if (!record)
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
        passport.authenticate('local', (err, user, info) => {
            // error from passport middleware

            if (err) return res.status(400).json(err);
            // registered user

            else if (user) return res.status(200).json({ token: user.generateJwt() });
            // unknown user or wrong password
            else return res.status(404).json(info);
        })(req, res);
    },

    async getAllUsers(req, res) {
        try {
            var users = await userModel.find({}).select('-password').populate('courseId')
                .populate('collegeId', '-departments')
                .populate('roleId')
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
    }
};