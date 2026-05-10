const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/', authController.getAllUsers);
router.get('/user-car/:userId', authController.getCarsByProfile);
router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);
module.exports = router
