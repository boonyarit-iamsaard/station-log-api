// noinspection DuplicatedCode

const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

const stationHandoverController = require('../controllers/station-handover.controller');

router.use(checkAuth);

router.get('/', stationHandoverController.findAll);

router.get('/:id', stationHandoverController.findOne);

router.post('/', stationHandoverController.create);

router.put('/:id', stationHandoverController.update);

router.delete('/:id', stationHandoverController.deleteOne);

module.exports = router;
