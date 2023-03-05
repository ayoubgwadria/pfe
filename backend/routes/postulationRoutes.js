const express = require('express');
const router = express.Router();
const postulationController = require('../controllers/postulation.controller');
const auth = require('../middleware/auth');


router.post('/postule', auth ,postulationController.createPostulation);
router.get('/post/:postId', auth ,postulationController.getPostulationsByPost);
router.put('/:id/accept', auth ,postulationController.acceptPostulation);
router.put('/:id/refuse', auth ,postulationController.refusePostulation);

module.exports = router;
