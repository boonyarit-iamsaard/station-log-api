const Flight = require('../models/flight-model');
const HttpError = require('../models/http-error');

const getFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find();

    res.json({ flights: flights });
  } catch (err) {
    const error = new HttpError(
      'Fetching flights failed, please try again later.',
      500
    );

    return next(error);
  }
};

const getFlightByID = async (req, res, next) => {
  const flightID = req.params.id;

  try {
    const flight = await Flight.findById(flightID);

    if (!flight) {
      const error = new HttpError(
        'Could not find flight for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ flight: flight });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a flight.',
      500
    );

    return next(error);
  }
};

const createFlight = async (req, res, next) => {
  const flightData = new Flight(req.body);

  try {
    const createdFlight = await flightData.save();

    if (!createdFlight) {
      const error = new HttpError(
        'Could not find flight for the provided id.',
        404
      );

      return next(error);
    }

    res.status(201).json({ flight: createdFlight });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a flight.',
      500
    );

    return next(error);
  }
};

const updateFlight = async (req, res, next) => {
  const flightID = req.params.id;
  const flightData = req.body;

  let flight;
  try {
    flight = await Flight.findById(flightID);

    if (!flight) {
      const error = new HttpError('Could not find flight for this id.', 404);

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a flight.',
      500
    );

    return next(error);
  }

  Object.keys(flightData).forEach(key => {
    flight[key] = flightData[key];
  });

  try {
    await flight.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update flight.',
      500
    );

    return next(error);
  }

  res.status(200).json({ flight: flight });
};

const deleteFlight = async (req, res, next) => {
  const flightID = req.params.id;

  let flight;
  try {
    flight = await Flight.findById(flightID);

    if (!flight) {
      const error = new HttpError('Could not find flight for this id.', 404);

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete flight.',
      500
    );

    return next(error);
  }

  try {
    await flight.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete flight.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Flight deleted successfully.' });
};

exports.getFlights = getFlights;
exports.getFlightByID = getFlightByID;
exports.createFlight = createFlight;
exports.updateFlight = updateFlight;
exports.deleteFlight = deleteFlight;
