const express = require('express');
const router = express.Router();
const apiController = require('../Controller/Api');


router.get('/:username',apiController.verifyUserName);
router.get('/verify/:userotp/:useremail',apiController.verifyUserOtp);
router.post('/', apiController.getSignIn);

//router.post('/registration',apiController.verifyRegistration);


//router.post('/login',apiController.getLogInUser);
//router.post('/login',apiController.)
// router.get('/api/users/getuser/:id',apiController.getUser);
// router.post('/api/users/edituser/:id',apiController.updateUser);
// router.post('/api/users/deleteuser/:id',apiController.deleteUser);
// router.get('/api/users/filterage/:age',apiController.filterAge);
// router.get('/api/users/filtername/:value',apiController.filterName);
// router.get('/api/users/filtercity/:value',apiController.filterAddress);
// router.get('/api/users/filterprofession/:value',apiController.filterProfession);
// router.get('/api/users/compoundfilter',apiController.compoundFilter);

module.exports = router;