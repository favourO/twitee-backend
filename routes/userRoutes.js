const { createAccount, verify, login, getMe, logout, updateDetails, updatePassword } = require('../controllers/auth');
const express = require('express');

const { protect } = require('../middleware/auth')
const router = express.Router();

router
    .post('/register', createAccount)
    .post('/verify', verify)
    .post('/login', login)
    .get('/me', protect, getMe)
    .get('/logout', logout)


module.exports = router;