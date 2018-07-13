const uniqid = require('uniqid');
//Nodemailer config
const nodemailer = require('nodemailer');
const creds = require('../config/nodemailer');
const transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  };
  
  const transporter = nodemailer.createTransport(transport);
  
  transporter.verify((error, success) => {
    if(error){
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });

module.exports = {
    sendEmailForUpdate: function(req,res){
        console.log(req.body);
        res.json("Send Email Update");

    },
    testCodeForUpdate: function(req,res){
        console.log(req.body);
        res.json("Send Email Update");

    },
    sendEmailForLink: function(req,res){
        console.log(req.body);
        // var usersEmail = req.body.currentEmail;
        // var verificationType = req.body.type;
        // var uniqueValidationCode = uniqid();
        // User.findOne({
        //     where: {
        //         email : usersEmail.currentEmail
        //     }
        // })
        // .then(function(dbUser){
        //     console.log(dbUser);
        //     var host = req.get('host');
        //     var link = `http://${host}/userProfile/account/verify?id=${dbUser.id}&type=${verificationType}&code=${uniqueValidationCode}`;
        //     var verificationEmail = {
        //         from: creds.USER,
        //         to: usersEmail,
        //         subject: "Verification link sent From Stalks!",
        //         text: 'Email Verification',
        //         html : `<p>Hello, please click this link to verify your email</p><button><a href="${link}">Click here to verify your email</a></button>`
        //     };

        //     console.log(verificationEmail);
        //     transporter.sendMail(verificationEmail, (err, data) => {
        //         if(err){
        //             res.json({
        //                 message: "fail"
        //             });
        //         } else {
        //             res.json({
        //                 msg: "Verification has been sent to email"
        //             });
        //         }
        //     })
        // })
        res.json("Send Email Update");

    },
    confirmViaLink: function(req,res){
        console.log(req.body);
        res.json("Send Email Update");

    },
    sendMessageFromUser: function(req,res){
        console.log(req.body);
        res.json("Send Email Update");

    },
    deleteAccount: function(req,res){
        console.log(req.body);
        res.json("Send Email Update");

    }

}