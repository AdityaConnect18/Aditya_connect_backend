const mongoose = require('mongoose')
const userModel = require('../Models/Users.model')
const passport = require('passport')
module.exports = {
    async register(req, res) {
        var user = new userModel();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = req.body.password;

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

    async getAllfaculty(req, res) {
        try {
            var faculty = await userModel.find({});
            return res.status(200).json({ message: 'All faculties details', faculty });
        }
        catch (err) {
            res.status(400).json({ message: 'somethingwent wrong with retriving !', err });
        }
    }
};