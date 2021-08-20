const AogHandover = require('../models/aog-handover.model');
const HttpError = require('../models/http-error');

const findAll = async (req, res, next) => {
  try {
    const records = await AogHandover.find();

    res.json({ records });
  } catch (err) {
    const error = new HttpError(
      'Fetching AOG handover records failed, please try again later.',
      500
    );

    return next(error);
  }
};

const findOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    const record = await AogHandover.findById(id);

    if (!record) {
      const error = new HttpError(
        'Could not find an AOG handover record for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ record });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an AOG handover record.',
      500
    );

    return next(error);
  }
};

const create = async (req, res, next) => {
  const data = new AogHandover(req.body);

  try {
    const record = await data.save();

    if (!record) {
      const error = new HttpError(
        'Could not create an AOG handover record.',
        404
      );

      return next(error);
    }

    res.status(201).json({ record });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create an AOG handover record.',
      500
    );

    return next(error);
  }
};

const update = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  let record;
  try {
    record = await AogHandover.findById(id);

    if (!record) {
      const error = new HttpError(
        'Could not find an AOG handover record for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an AOG handover record.',
      500
    );

    return next(error);
  }

  Object.keys(record).forEach(key => {
    record[key] = data[key];
  });

  try {
    await record.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update an AOG handover record.',
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
    record = await AogHandover.findById(id);

    if (!record) {
      const error = new HttpError(
        'Could not find an AOG handover record for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an AOG handover record.',
      500
    );

    return next(error);
  }

  try {
    await record.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete an AOG handover record.',
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ message: 'An AOG handover record deleted successfully.' });
};

exports.create = create;
exports.deleteOne = deleteOne;
exports.findOne = findOne;
exports.findAll = findAll;
exports.update = update;
