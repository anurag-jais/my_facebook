const express = require('express');
const router = express.Router();
const apiController = require('../Controller/Api');

router.post('/',apiController.getLogIn);
router.get('/verify/:useremail/:userotp',apiController.verifyOtpRecovery);
router.get('/identify/:useremail',apiController.identifyUser);
router.post('/updatepassword',apiController.updatePassword);
module.exports = router;