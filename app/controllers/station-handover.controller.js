const StationHandover = require('../models/station-handover.model');
const HttpError = require('../models/http-error');

const findAll = async (req, res, next) => {
  try {
    const records = await StationHandover.find();

    res.json({ records });
  } catch (err) {
    const error = new HttpError(
      'Fetching station handover records failed, please try again later.',
      500
    );

    return next(error);
  }
};

const findOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const record = await StationHandover.findById(id);

    if (!record) {
      const error = new HttpError(
        'Could not find a station handover record for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ record });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a station handover record.',
      500
    );

    return next(error);
  }
};

const create = async (req, res, next) => {
  const recordData = new StationHandover(req.body);

  try {
    const record = await recordData.save();

    if (!record) {
      const error = new HttpError(
        'Could not create a station handover record.',
        404
      );

      return next(error);
    }

    res.status(201).json({ record });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create a station handover record.',
      500
    );

    return next(error);
  }
};

const update = async (req, res, next) => {
  const id = req.params.id;
  const recordData = req.body;

  let record;
  try {
    record = await StationHandover.findById(id);

    if (!record) {
      const error = new HttpError(
        'Could not find an station handover record for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an station handover record.',
      500
    );

    return next(error);
  }

  Object.keys(recordData).forEach(key => {
    record[key] = recordData[key];
  });

  try {
    await record.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update a station handover record.',
      500
    );

    return next(error);
  }

  res.status(200).json({ record });
};

const deleteOne = async (req, res, next) => {
  const id = req.params.id;

  let record;
  try {
    record = await StationHandover.findById(id);

    if (!record) {
      const error = new HttpError(
        'Could not find an station handover record for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a station handover record.',
      500
    );

    return next(error);
  }

  try {
    await record.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete a station handover record.',
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ message: 'A station handover record deleted successfully.' });
};

exports.create = create;
exports.deleteOne = deleteOne;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
