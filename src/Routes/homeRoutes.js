const express = require('express');
const router = express.Router();
const apiController = require('../Controller/Api');
const passport = require('passport');
router.get('/verifytoken', passport.authenticate('jwt', { session: false }),apiController.verifyToken);
module.exports = router;