const express = require('express');
const router = express.Router();
const apiController = require('../Controller/Api');
const isValidEmail = require('../middleware/isValidEmail');

router.get('/:username',apiController.verifyUserName);
router.get('/verify/:userotp/:useremail',apiController.verifyUserOtp);
//router.post('/',isValidEmail, apiController.getSignIn);
router.post('/', apiController.getSignIn);

//router.post('/registration',apiController.verifyRegistration);


module.exports = router;