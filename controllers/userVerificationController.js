const uniqid = require('uniqid');
const db = require('../models/mysql');
const passport = require('../config/passport');
// const User = db.User;
// Nodemailer config
const nodemailer = require('nodemailer');
const creds = require('../config/nodemailer');
const transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS,
    },
  };

const transporter = nodemailer.createTransport(transport);

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

  /**
   * This is a function
   * @return {string} 6 character code
   */
function generateCode() {
    const text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    };

    return text;
}
module.exports = {
    sendEmailForUpdate: function(req, res) {
        console.log(req.body);
        const {userEmail, updateType} = req.body;
        const codeToInput = generateCode();
        db.User.findOne({
            where: {
                email: userEmail,
            },
        }).then(function(dbUser) {
            res.json('Send Email Update');
        });
    },
    testCodeForUpdate: function(req, res) {
        console.log(req.body);
        res.json('Send Email Update');
    },
    sendEmailForLink: function(req, res) {
        console.log('hello');
        console.log(req.body);
        const EmailtoVerify = req.body.emailToVerify;
        if (req.body.current_email) {
            const currentEmail = req.body.current_email;
            db.User.findOne({
                where: {
                    email: currentEmail,
                },
            })
            .then(function(dbUser) {
                console.log(dbUser);
                console.log(dbUser.id);
                const usersID = dbUser.id;
                const verificationType = 'email change';
                const uniqueValidationCode = uniqid();

                db.UserValidation.create({
                    validationCode: uniqueValidationCode,
                    validationType: verificationType,
                    UserId: usersID,
                    emailToValidate: EmailtoVerify})
                    .then(function(validation) {
                        console.log(validation.id);
                        const validationID = validation.id;
                        const host = req.get('host');
                        const link = `http://${host}/userProfile/account/verify?userId=${dbUser.id}&validatorId=${validationID}&type=${verificationType}&code=${uniqueValidationCode}`;
                        const verificationEmail = {
                            from: creds.USER,
                            to: EmailtoVerify,
                            subject: 'Verification link sent from Stalks!',
                            text: 'Email Verification',
                            html: `<p>Hello, please click this link to verify your email</p><button>
                                    <a href="${link}">Click here to verify your email</a></button>`,
                        };

                        console.log(verificationEmail);
                        transporter.sendMail(verificationEmail, (err, data) => {
                            if (err) {
                                res.json({
                                    msg: 'Failed to send email',
                                });
                            } else {
                                res.json({
                                    msg: `Verification has been sent to ${EmailtoVerify}.`,
                                });
                            };
                        });
                    });
            });
        } else {
            const verificationType = req.body.type;
            const uniqueValidationCode = uniqid();
            db.User.findOne({
                where: {
                    email: EmailtoVerify,
                },
            })
            .then(function(dbUser) {
                console.log(dbUser);
                const host = req.get('host');
                const link = `http://${host}/userProfile/account/verify?id=${dbUser.id}&type=${verificationType}&code=${uniqueValidationCode}`;
                const verificationEmail = {
                    from: creds.USER,
                    to: EmailtoVerify,
                    subject: 'Verification link sent From Stalks!',
                    text: 'Email Verification',
                    html: `<p>Hello, please click this link to verify your email</p><button>
                            <a href="${link}">Click here to verify your email</a></button>`,
                };

                console.log(verificationEmail);
                transporter.sendMail(verificationEmail, (err, data) => {
                    if (err) {
                        res.json({
                            message: 'fail',
                        });
                    } else {
                        res.json({
                            msg: 'Verification has been sent to email',
                        });
                    }
                });
            });
            res.json('Send Email Update');
        };
    },
    confirmViaLink: function(req, res) {
        console.log(req.body);
        /**
         * The link should take us to a page in the settings under the Verification tab.
         * Once on that page the component will grab the
         * id (users id)
         * validation id (id to search in userVerification table)
         * the verification type (the type of verification should be email)
         * and the verification code from the url and create an api call. to this function
         * */
        const {userID, validationID, verificationType, verificationCode} = req.body;

        db.UserValidation.update(
            {
                resolved: true,
            },
        {
            where: {
                id: validationID,
                UserId: userID,
                validationCode: verificationCode,
                validationType: verificationType,
            },
        })
        .then(function(dbvalidation) {
            const {emailToValidate} = dbvalidation;
            db.User.update({
                email: emailToValidate,
            }, {
                where: {
                    id: userID,
                },
            }).then(function(dbUser) {
                if (dbUser.email === emailToValidate) {
                    res.json({
                        msg: `Email Successfully changed to ${emailToValidate}`, 
                    });
                } else {
                    res.json({
                        msg: `There has been an error changing your email. Please contact support`,
                    });
                };
            });
        });
    },
    sendMessageFromUser: function(req, res) {
        console.log(req.body);
        res.json('Send Email Update');
    },
    deleteAccount: function(req, res) {
        console.log(req.body);
        res.json('Send Email Update');
    },
};
