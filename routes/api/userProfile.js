const {Router} = require('express');
const router = new Router();

const userController = require('../../controllers/userController');
const userVerificationController = require('../../controllers/userVerificationController');

// Get users information when on this page
router.get('/getInfo', userController.getInfo);

router.get('/checkPassword', userController.checkPassword);
// Updates users email after clicking on email link
router.put('/update/email', userController.updateEmail);


// // Updates password after confirming verification code in email
router.put('/update/password', userController.updatePassword);

// // Updates Username after confirming verification code in email
router.put('/update/Username', userController.updateUsername);

// //
router.post('/user/post/update/verification', userVerificationController.sendEmailForUpdate);

// //
router.post('/user/confirm/update/verification', userVerificationController.testCodeForUpdate);

// //
router.post('/sendEmailVerification', userVerificationController.sendEmailForLink);

// //
router.post('/user/get/update/email/verification/:key', userVerificationController.confirmViaLink);

// //
router.put('/user/account/put/message', userVerificationController.sendMessageFromUser);

router.post('/user/account/delete', userVerificationController.deleteAccount);

//
router.post('/user/account/', userController.toggleTips);
// Few more pet roputes but ehh might not do them

module.exports = router;
