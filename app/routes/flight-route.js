// noinspection DuplicatedCode

const express = require('express');
const router = express.Router();

// const checkAuth = require('../middlewares/check-auth');

const flightController = require('../controllers/flight-controller');

// router.use(checkAuth);

router.get('/', flightController.getFlights);

router.get('/:id', flightController.getFlightByID);

router.post('/', flightController.createFlight);

router.put('/:id', flightController.updateFlight);

router.delete('/:id', flightController.deleteFlight);

module.exports = router;
