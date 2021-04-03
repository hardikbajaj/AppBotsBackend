const express = require('express');
const { validateSigninRequest, isRequestValidated, validateSignupRequest } = require('../validators/auth');
const auth = require('../controllers/user/auth');
const { getAreas } = require('../controllers/areas');
const { getBulbsByArea } = require('../controllers/bulbs');
const { requestLithing } = require('../controllers/user/bulb');
const { isUser, requireSignin } = require('../middleware');

const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, auth.signup);
router.post('/signin', validateSigninRequest, isRequestValidated, auth.signin);

router.get('/area',requireSignin,isUser,  getAreas);
router.get('/bulbs/area/:id',requireSignin, isUser,  getBulbsByArea)
router.post('/request/bulb',requireSignin, isUser,  requestLithing);

module.exports = router