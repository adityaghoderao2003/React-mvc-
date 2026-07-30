const express = require('express');
const router = express.Router();

const {register} = require('../controllers/Registercontroller');
const {login} = require('../controllers/Logincontroller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;