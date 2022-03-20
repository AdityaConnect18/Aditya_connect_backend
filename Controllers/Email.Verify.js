const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kurrucharan987@gmail.com',
        pass: '@Charan1234'
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
    }
};