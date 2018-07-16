const uniqid = require('uniqid');
const db = require('../models/mysql');
const User = db.User;
const UserValidation = db.UserValidation;
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
// function generateCode() {
//     const text = '';
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < 6; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     };

//     return text;
// }
module.exports = {
    // In progress
    sendEmailForUpdate: function(req, res) {
        // console.log(req.body);
        // const {userEmail, updateType} = req.body;
        // const codeToInput = generateCode();
        // db.User.findOne({
        //     where: {
        //         email: userEmail,
        //     },
        //     include: {
        //        model: db.UserValidation,
        //        as: 'Validations',
        //        where: {
        //            resolved: false,
        //        },
        //     },
        // }).then(function(dbUser) {
        //     // Now that I have the users information in the database
        //     res.json('Send Email Update');
        // });
    },
    testCodeForUpdate: function(req, res) {
        console.log(req.body);
        res.json('Send Email Update');
    },
    // Complete but may update to condense (I dont think i need all of it anymore)
    sendEmailForLink: function(req, res) {
        console.log('hello');
        console.log(req.body);
        const EmailtoVerify = req.body.emailToVerify;
        const host = req.body.host;
        if (req.body.current_email) {
            const currentEmail = req.body.current_email;
            User.findOne({
                where: {
                    email: currentEmail,
                },
            })
            .then(function(dbUser) {
                console.log(dbUser);
                console.log(dbUser.id);
                const usersID = dbUser.id;
                const verificationType = 'email';
                const uniqueValidationCode = uniqid();

                UserValidation.create({
                    validationCode: uniqueValidationCode,
                    validationType: verificationType,
                    UserId: usersID,
                    emailToValidate: EmailtoVerify})
                    .then(function(validation) {
                        console.log(validation.id);
                        const link = `http://${host}/settings/account/verify?userId=${dbUser.id}&validatorId=${validation.id}&type=${validation.validationType}&code=${validation.validationCode}`;
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
        };
    },
    // Complete but may update to try and integrate passport for this
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

        UserValidation.update(
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
                emailVerified: true,
            }, {
                where: {
                    id: userID,
                },
            }).then(function(dbUser) {
                if (dbUser.email === emailToValidate) {
                    db.User.findOne({
                        where: {
                            id: userID,
                        },
                        include: {
                            model: db.Pet,
                            as: 'Pet',
                            where: {
                              UserId: userID,
                            },
                          },
                    })
                    .then(function(user) {
                        req.session.user = user;
                        res.json(req.session.user);
                    })
                    .catch(function(err) {
                        res.json(err);
                    });
                } else {
                    res.json(`There has been an error changing your email. Please contact support`);
                };
            });
        });
    },
    // In Progress
    sendMessageFromUser: function(req, res) {
        console.log(req.body);
        res.json('Send Email Update');
    },
    // In progress
    deleteAccount: function(req, res) {
        console.log(req.body);
        res.json('Send Email Update');
    },
};
