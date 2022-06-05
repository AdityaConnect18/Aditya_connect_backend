const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
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
    async sendOtpToEmail2(email, otp) {
        const mailOptions = {
            from: `"pravinmaroju217@gmail.com"`,
            to: email,
            subject: 'Password Reset Aditya Connect',
            text: 'OTP',
            html: `<h3>Your one time password for resetting your password</h3>
                   <h2>${otp}</h2>`
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "pravinmaroju217@gmail.com",
                pass: "lscpeustwybteumb"
            }
        });

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (err, data) {
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