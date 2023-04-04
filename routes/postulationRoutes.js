const express = require('express');
const router = express.Router();
const postulationController = require('../controllers/postulation.controller');
const auth = require('../middleware/auth');


router.post('/postule/:postId/:technicienId', auth ,postulationController.createPostulation);
router.get('/posttech/:technicienId', auth , postulationController.getPostulationByTech);
router.get('/postclient/:clientId', auth , postulationController.getPostulationsByClient);
router.put('/:id/accept', auth ,postulationController.acceptPostulation);
router.put('/:id/refuse', auth ,postulationController.refusePostulation);

module.exports = router;
