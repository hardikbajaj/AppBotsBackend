const express = require('express');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');
const auth = require('../controllers/admin/auth');


const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, auth.signup);
router.post('/signin', validateSigninRequest, isRequestValidated, auth.signin);

module.exports = router