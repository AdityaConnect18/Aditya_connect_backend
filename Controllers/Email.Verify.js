const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yashwanthkurru@gmail.com',
        pass: '@Yash1234'
    }
});

module.exports = {
    verifyMail(req, res) {

        var jwt = 'jfjsksf'
        var token = `http://localhost:3400/emailVerifyResponse/${jwt}`
        let mailDetails = {
            from: 'kurrucharan987@gmail.com',
            to: '18A91A1232@aec.edu.in',
            subject: 'Test mail',
            text: 'Node.js testing mail for GeeksforGeeks',
            html: `<h3>Hello World</h3>
                    <a href=${token}>Click here</a>`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });

    },

    verifyMailResponse(req, res) {
        console.log(req.params);
        console.log("Got back response , User verified");
        res.send({});
    },

    async sendOtpToEmail(email, otp) {

        let mailDetails = {
            from: 'yashwanthkurru@gmail.com',
            to: email,
            subject: 'Password Reset Aditya Connect',
            text: 'OTP',
            html: `<h3>Your one time password for resetting your password</h3>
                   <h2>${otp}</h2>`
        };
        return new Promise((resolve, reject) => {

            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                    resolve(false)
                } else {
                    console.log('Email sent successfully');
                    resolve(true)
                }
            });

        });

    }

};