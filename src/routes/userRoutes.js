const express = require('express');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../validators/auth');
const auth = require('../controllers/user/auth');

const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, auth.signup);
router.post('/signin', validateSigninRequest, isRequestValidated, auth.signin);

module.exports = router