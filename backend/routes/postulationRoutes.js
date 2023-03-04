const express = require('express');
const router = express.Router();
const postulationController = require('../controllers/postulation.controller');


router.post('/postule', postulationController.createPostulation);
router.get('/post/:postId', postulationController.getPostulationsByPost);
router.put('/:id/accept', postulationController.acceptPostulation);
router.put('/:id/refuse', postulationController.refusePostulation);

module.exports = router;
