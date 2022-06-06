const nodemailer = require('nodemailer')


module.exports = {
    async sendOtpToEmail2(email, otp) {
        const mailOptions = {
            from: `"pravinmaroju217@gmail.com"`,
            to: email,
            subject: 'Password Reset Aditya Connect',
            text: 'OTP',
            html: `
                <body>
                    <img src="https://aec.edu.in/adityanew/images/logo.png"
                        style="display: block; margin-left:auto; margin-right: auto; width: 100%;height:40%">
                    <h1 style="text-align: center;"> ADITYA CONNECT</h1>
                    <h4 style="text-align: center;"> Your OTP for password resetting : </h4>
                    <h2 style= "text-align: center;color:#0B0B45;margin-top:-3px" >${otp}</h2>

                </body>`
        };

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "adityaconnect18@gmail.com",
                pass: "qcgagehxxwolpqbk"
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


// can be used for user email verification

 // verifyMail(req, res) {
    //     var jwt = 'jfjsksf'
    //     var token = `http://localhost:3400/emailVerifyResponse/${jwt}`
    //     let mailDetails = {
    //         from: 'kurrucharan987@gmail.com',
    //         to: '18A91A1232@aec.edu.in',
    //         subject: 'Test mail',
    //         text: 'Node.js testing mail for GeeksforGeeks',
    //         html: `<h3>Hello World</h3>
    //                 <a href=${token}>Click here</a>`
    //     };
    //     mailTransporter.sendMail(mailDetails, function (err, data) {
    //         if (err) {
    //             console.log('Error Occurs');
    //         } else {
    //             console.log('Email sent successfully');
    //         }
    //     });
    // },
    // verifyMailResponse(req, res) {
    //     console.log(req.params);
    //     console.log("Got back response , User verified");
    //     res.send({});
    // },