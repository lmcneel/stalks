const {Router} = require('express');
const router = new Router();

const userController = require('../../controllers/userController');
const userVerificationController = require('../../controllers/userVerificationController');
const authenticator = require('../../config/middleware/isAuthenticated');

// Get users information when on this page
router.get('/getInfo', userController.getInfo);

router.get('/checkPassword', authenticator, userController.checkPassword);
// Updates users email after clicking on email link
router.put('/update/email', authenticator, userController.updateEmail);


// // Updates password after confirming verification code in email
router.put('/update/password', authenticator, userController.updatePassword);

// // Updates Username after confirming verification code in email
router.put('/update/Username', authenticator, userController.updateUsername);

// //
router.post('/user/post/update/verification', authenticator, userVerificationController.sendEmailForUpdate);

// //
router.post('/user/confirm/update/verification', authenticator, userVerificationController.testCodeForUpdate);

// //
router.post('/sendEmailVerification', authenticator, userVerificationController.sendEmailForLink);

// //
router.post('/user/get/update/email/verification/:key', authenticator, userVerificationController.confirmViaLink);

// //
router.put('/user/account/put/message', authenticator, userVerificationController.sendMessageFromUser);

router.post('/user/account/delete', authenticator, userVerificationController.deleteAccount);

//
router.post('/user/account/', authenticator, userController.toggleTips);
// Few more pet roputes but ehh might not do them

module.exports = router;
