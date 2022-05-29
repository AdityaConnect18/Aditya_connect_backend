const nodemailer = require('nodemailer')
let aws = require("@aws-sdk/client-ses");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

//AWS
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    defaultProvider,
  });


// create Nodemailer SES transporter
let mailTransporter = nodemailer.createTransport({
    SES: { ses, aws },
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

        // let mailDetails = {
        //     from: 'yashwanthkurru@gmail.com',
        //     to: email,
        //     subject: 'Password Reset Aditya Connect',
        //     text: 'OTP',
        //     html: `<h3>Your one time password for resetting your password</h3>
        //            <h2>${otp}</h2>`
        // };
        return new Promise((resolve, reject) => {
            // mailTransporter.sendMail(mailDetails, function (err, data) {
            //     if (err) {
            //         console.log('Error Occurs');
            //         resolve(false)
            //     } else {
            //         console.log('Email sent successfully');
            //         resolve(true)
            //     }
            // });// send some mail
            transporter.sendMail(
            {
                from: "yashwanthkurru@gmail.com",
                to: "18a91a1232@aec.edu.in",
                subject: "Message",
                text: "I hope this message gets sent!",
                ses: {
                    // optional extra arguments for SendRawEmail
                    Tags: [
                    {
                        Name: "tag_name",
                        Value: "tag_value",
                    },
                    ],
                }
            },
            (err, info) => {
                console.log(info.envelope);
                console.log(info.messageId);
                if (err) {
                console.log('Error Occurs');
                resolve(false)
                } else {
                    console.log('Email sent successfully');
                    resolve(true)
                }
                }
            );
                });

    }

};