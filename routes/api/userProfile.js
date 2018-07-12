const router = require('express').Router();

const userController = require('../../controllers/userController');
const userVerificationController = require('../../controllers/userControllers');

//Get users information when on this page
router.get('/getInfo', userController.getInfo);

//Updates users email after clicking on email link
router.put('/update/email', userController.updateEmail);

// Updates password after confirming verification code in email
router.put('/update/password', userController.updatePassword);

// Updates Username after confirming verification code in email
router.put('/update/Username', userController.updateUsername);

//
router.post('/api/user/post/update/verification', userVerificationController.sendEmailForUpdate);

//
router.post('/api/user/confirm/update/verification', userVerificationController.testCodeForUpdate);

//
router.post('/api/user/post/emal/verification', userVerificationController.sendEmailForLink);

//
router.post('/api/user/get/update/email/verification/:key', userVerificationController.confirmViaLink);

//
router.put('/api/user/account/put/message', userVerificationController.sendFromUser);

router.post('/api/user/account/delete', userVerificationController.deleteAccount);
 
router.post('/api/user/account/', userController.toggleTips);
//Few more pet roputes but ehh might not do them

module.exports = router;