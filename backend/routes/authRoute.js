const express = require('express');
const router = express.Router();
const { userCreate,userLogin,logout } = require('../controller/authController');

router.post('/auth/register', userCreate);
router.post('/auth/login', userLogin);
router.post('/auth/logout', logout);




module.exports = router;