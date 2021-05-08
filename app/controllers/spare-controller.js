const HttpError = require('../models/http-error');
const Spare = require('../models/spare-model');

const getSpares = async (req, res, next) => {
  let spares;
  try {
    spares = await Spare.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching spares failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({ spares: spares });
};

const getSpareByID = async (req, res, next) => {
  const spareID = req.params.id;

  let spare;
  try {
    spare = await Spare.findById(spareID);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a spare.',
      500
    );
    return next(error);
  }

  if (!spare) {
    const error = new HttpError(
      'Could not find spare for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ spare: spare });
};

const createSpare = async (req, res, next) => {
  const spare = new Spare(req.body);

  try {
    const createdSpare = await spare.save();

    if (!createdSpare) {
      const error = new HttpError(
        'Could not find spare for the provided id.',
        404
      );
      return next(error);
    }

    res.status(201).json({ spare: createdSpare });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a spare.',
      500
    );
    return next(error);
  }
};

const updateSpare = async (req, res, next) => {
  const spareID = req.params.id;
  const spareData = req.body;

  let spare;
  try {
    spare = await Spare.findByIdAndUpdate(spareID, spareData, {
      new: true,
      useFindAndModify: false,
    });

    if (!spare) {
      const error = new HttpError(
        'Could not find spare for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ spare: spare });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a spare.',
      500
    );
    return next(error);
  }
};

const deleteSpare = async (req, res, next) => {
  const spareID = req.params.id;

  let spare;
  try {
    spare = await Spare.findById(spareID);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!spare) {
    const error = new HttpError('Could not find spare for this id.', 404);
    return next(error);
  }

  try {
    await spare.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete spare.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Spare deleted successfully.' });
};

exports.getSpares = getSpares;
exports.getSpareByID = getSpareByID;
exports.createSpare = createSpare;
exports.updateSpare = updateSpare;
exports.deleteSpare = deleteSpare;
