const express = require('express');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');
const auth = require('../controllers/admin/auth');
const { addArea, addBulbToArea, addPeopleCountArea } = require('../controllers/admin/areas');
const { setIotBulbStatus, setBulbStatusById, falseAll } = require('../controllers/admin/bulb');
const { requireSignin, isAdmin } = require('../middleware');
const { getAreas } = require('../controllers/areas');
const { getBulbsByArea } = require('../controllers/bulbs');



const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, auth.signup);
router.post('/signin', validateSigninRequest, isRequestValidated, auth.signin);
router.post('/area',requireSignin,isAdmin, addArea);
router.post('/bulbs/add',requireSignin, isAdmin, addBulbToArea);
router.post('/people/add',requireSignin,isAdmin, addPeopleCountArea);
router.post('/reset/bulb', requireSignin,isAdmin,setIotBulbStatus);
router.post('/set/bulb',requireSignin,isAdmin, setBulbStatusById);


router.get('/area',requireSignin,isAdmin,  getAreas);
router.get('/bulbs/area/:id',requireSignin,isAdmin,  getBulbsByArea)






router.post('/temp',setIotBulbStatus);



module.exports = router