const express = require('express');
const router = express.Router();
const equipmentsController = require('../controllers/equipments.controller');

router
    .get('/', equipmentsController.get)
    .get('/:id', equipmentsController.getById)
    .post('/', equipmentsController.create)
    .put('/:id', equipmentsController.update)
    .delete('/:id', equipmentsController._delete);

module.exports = router;