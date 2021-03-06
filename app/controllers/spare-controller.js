const HttpError = require('../models/http-error');
const Spare = require('../models/spare-model');

const getSpares = async (req, res, next) => {
  let partCount;
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

  try {
    partCount = await Spare.aggregate()
      .group({
        _id: '$part',
        count: {
          $sum: 1,
        },
      })
      .sort({
        count: -1,
      })
      .limit(10);
  } catch (err) {
    const error = new HttpError(
      'Fetching spares failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    partCount,
    spares,
  });
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
  const id = req.params.id;
  const spareData = req.body;

  let spare;
  try {
    spare = await Spare.findById(id);

    if (!spare) {
      const error = new HttpError('Could not find spare for this id.', 404);

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a spare.',
      500
    );

    return next(error);
  }

  Object.keys(spareData).forEach(key => {
    spare[key] = spareData[key];
  });

  try {
    await spare.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update spare.',
      500
    );

    return next(error);
  }

  res.status(200).json({ spare: spare });
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
