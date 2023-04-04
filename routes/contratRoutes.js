const express = require('express');
const router = express.Router();
const contratController = require('../controllers/contrat.controller');


router.post('/add', contratController.createContrat);
router.put('/action/:contratId', contratController.actionContrat);

module.exports = router;
