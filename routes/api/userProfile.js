const {Router} = require('express');
const router = new Router();

const userController = require('../../controllers/userController');
const userVerificationController = require('../../controllers/userVerificationController');
const authenticator = require('../../config/middleware/isAuthenticated');

// Get users information when on this page
// Checked and working
router.get('/getInfo', userController.getInfo);

// In progress
router.get('/checkPassword', authenticator, userController.checkPassword);

// In progress
router.put('/update/email', authenticator, userController.updateEmail);

// In progress
router.put('/update/password', authenticator, userController.updatePassword);

// In progress
router.put('/update/Username', authenticator, userController.updateUsername);

// In progress
router.post('/post/update/verification', authenticator, userVerificationController.sendEmailForUpdate);

// In progress
router.post('/confirm/update/verification', authenticator, userVerificationController.testCodeForUpdate);

// Checked and working
router.post('/sendEmailVerification', authenticator, userVerificationController.sendEmailForLink);

// In progress
router.put('/update/email/verification', authenticator, userVerificationController.confirmViaLink);

// In progress
router.put('/account/put/message', authenticator, userVerificationController.sendMessageFromUser);

// In progress
router.post('/account/delete', authenticator, userVerificationController.deleteAccount);

// In progress
router.post('/account', authenticator, userController.toggleTips);

// Few more pet routes

module.exports = router;
