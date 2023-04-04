const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get ('/gettechniciens', userController.getTechniciens)
router.get('/me',  userController.getProfile);

module.exports = router;