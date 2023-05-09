const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const { uploadUser } = require('../middleware/upload')

router.post('/register', uploadUser.single('image'), userController.register);
router.post('/login', userController.login);
router.get('/gettechniciens', userController.getTechniciens)
router.get('/me', userController.getProfile);
router.get('/user/image/:id', userController.getUserImage)
module.exports = router;