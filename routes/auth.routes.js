const express = require('express');
const login = require('../controllers/login.controller');
const protected = require('../controllers/protected.controller');
const register = require('../controllers/register.controller');
const logout = require('../controllers/logout.controller');
const router = express.Router();
const newToken = require('../controllers/newToken.controller');

// login user

router.post('/login', login) //✅ tested

// Resgister a user
router.post('/register', register); //✅ tested

// logout a user
router.post('/logout', logout); //✅ tested

// protected route
router.post('/protected', protected); //✅ tested

// get a new access token with refresh token
router.post('/refresh_token', newToken); //✅ tested

module.exports = router;
