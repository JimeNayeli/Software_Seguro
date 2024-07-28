const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

router
    .get('/', scheduleController.get)
    .get('/:id', scheduleController.getById)
    .post('/', scheduleController.create)
    .put('/:id', scheduleController.update)
    .delete('/:id', scheduleController._delete);

module.exports = router;