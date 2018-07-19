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
function generateCode() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    };

    return text;
};
module.exports = {
    // In progress
    sendEmailForUpdate: function(req, res) {
        console.log(req.body);
        console.log('Sending email for update');

        const {current_email, verificationType} = req.body;
        console.log(current_email);
        console.log(verificationType);
        const codeToInput = generateCode();
        console.log(codeToInput);
        User.findOne({
            where: {
                email: current_email,
            },
            include: {
               model: UserValidation,
               as: 'UserValidations',
            },
        }).then(function(dbUser) {
            console.log(dbUser);
            console.log(dbUser.UserValidations);
            let indexofValidationID = 'none'
            for (let i = 0; i < dbUser.UserValidations.length; i++) {
                if (dbUser.UserValidations[i].resolved === false) {
                    indexofValidationID = dbUser.UserValidations[i].id;
                };
            };

            if (typeof indexofValidationID == 'number') {
                console.log('updated instead');
                UserValidation.update({
                    validationCode: codeToInput,
                    validationType: verificationType,
                    UserId: dbUser.id,
                    emailToValidate: current_email,
                },
                {
                    where: {
                        id: indexofValidationID,
                    },
                })
                .then(function(dbvalidation) {
                    const verificationEmail = {
                        from: creds.USER,
                        to: current_email,
                        subject: 'Verification Code sent from Stalks!',
                        text: 'Verification Code',
                        html: `<p>Hello, please click input this code ${codeToInput}</p>`,
                    };
                    console.log(verificationEmail);
                    transporter.sendMail(verificationEmail, (err, data) => {
                        console.log('Mail has been sent.');
                        if (err) {
                            res.json({
                                msg: 'Failed to send email',
                            });
                        } else {
                            res.json({
                                msg: `Verification code has been sent to ${current_email}.`,
                            });
                        };
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    res.json({
                        msg: 'Failed to update validation',
                    });
                });
            } else {
            // Now that I have the users information in the database
                UserValidation.create({
                    validationCode: codeToInput,
                    validationType: verificationType,
                    UserId: dbUser.id,
                    emailToValidate: current_email,
                })
                .then(function(dbvalidation) {
                    console.log(dbvalidation);
                    const verificationEmail = {
                        from: creds.USER,
                        to: current_email,
                        subject: 'Verification Code sent from Stalks!',
                        text: 'Verification Code',
                        html: `<p>Hello, please click input this code ${codeToInput}</p>`,
                    };
                    console.log(verificationEmail);
                    transporter.sendMail(verificationEmail, (err, data) => {
                        console.log('Mail has been sent.');
                        if (err) {
                            res.json({
                                msg: 'Failed to send email',
                            });
                        } else {
                            res.json({
                                msg: `Verification code has been sent to ${current_email}.`,
                            });
                        };
                    });
                });
            }
    });
    },
    testCodeForUpdate: function(req, res) {
        console.log('testing code');
        const {current_email, verificationType, inputedCode} = req.body;
        console.log(req.body);
        UserValidation.findOne({
            where: {
                emailToValidate: current_email,
                validationType: verificationType,
                resolved: false,
            },
        })
        .then(function(dbValidation) {
            console.log(dbValidation);
            console.log('checking if code matches');

            if (inputedCode === dbValidation.validationCode) {
                res.json('Correct Code');
            } else {
                res.json('Incorrect Code');
            }
        });
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
        console.log('Sending message form user');
        console.log(req.body);
        const messagesToSelf = {
            from: creds.USER,
            to: creds.User,
            subject: 'Message from User',
            text: `${req.body.user_email}`,
            html: `<p> ${req.body.topic} </p> <p> ${req.body.message} </p>`,
        };

        console.log(messagesToSelf);
        transporter.sendMail(messagesToSelf, (err, data) => {
            if (err) {
                res.json({
                    msg: 'Failed to send email',
                });
            } else {
                const messagesToUser = {
                    from: creds.USER,
                    to: req.body.user_email,
                    subject: 'We recieved your email!',
                    text: `Message Confirmation`,
                    html: `<p> Thank you for your message </p> <p> This is an automated message confirming that we've recieved your message and will 
                        responded within the next 24 hours. Thank you. </p>`,
                };
                transporter.sendMail(messagesToUser, (err, data) => {
                    if (err) {
                        res.json({
                            msg: 'Failed to send Email',
                        });
                    } else {
                        res.json({
                            msg: 'Message has been recieved!',
                        });
                    };
                });
            };
        });
    },
    // In progress
    deleteAccount: function(req, res) {
        console.log('Deleting Account');
        console.log(req.body);
        User.findOne({
            where: {
                username: req.body.current_username,
            },
        })
        .then(function(dbUser) {
            if (dbUser) {
                if (dbUser.validPassword(req.body.current_password)) {
                    User.destroy({
                        where: {
                            id: dbUser.id,
                        },
                    })
                    .then(function(dbUser) {
                        res.json({
                            message: 'Deleted Account',
                        });
                    })
                    .catch(function(err) {
                        res.json({
                            message: 'There has been an error processing your request please try agian later.',
                        });
                    });
                } else {
                    res.json({
                        message: 'Password is incorrect',
                    });
                };
            } else {
                res.json({
                    message: 'Username is incorrect',
                });
            };
        })
        .then(function(err) {
            res.json({
                message: 'There has been an error processing your request please try agian later.',
            });
        });
    },
};
