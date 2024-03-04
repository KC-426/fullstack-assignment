const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/user_signup',authController.userSignup);
router.post('/user_login', authController.userLogin);
router.post('/reset_password', authController.resetPassword)
router.post('/new_password', authController.newPassword)
router.get("/logout", authController.userLogout)


module.exports = router;


