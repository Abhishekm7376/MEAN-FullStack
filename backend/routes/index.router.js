const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlEmply = require('../controllers/employee.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/employee',jwtHelper.verifyJwtToken, ctrlEmply.empProfile);
router.post('/employee',jwtHelper.verifyJwtToken, ctrlEmply.createProfile);
router.put('/employee/:id',jwtHelper.verifyJwtToken, ctrlEmply.editProfile);
router.delete('/employee/:id',jwtHelper.verifyJwtToken, ctrlEmply.deleteProfile);

module.exports = router;


 