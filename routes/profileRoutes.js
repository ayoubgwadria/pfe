const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const auth = require('../middleware/auth');


router.post('/add', auth, profileController.add);
router.get ('/getprofile/:userId',profileController.getprofile);
router.get ('/findAllProfile',profileController.findAllProfile);

module.exports = router;