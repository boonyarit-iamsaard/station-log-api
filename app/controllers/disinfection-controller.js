const Disinfection = require('../models/disinfection-model');
const HttpError = require('../models/http-error');

const getDisinfectionList = async (req, res, next) => {
  try {
    const disinfectionList = await Disinfection.find();

    res.json({ disinfectionList: disinfectionList });
  } catch (err) {
    const error = new HttpError(
      'Fetching disinfection list failed, please try again later.',
      500
    );

    return next(error);
  }
};

const getDisinfectionByID = async (req, res, next) => {
  const id = req.params.id;

  try {
    const disinfection = await Disinfection.findById(id);

    if (!disinfection) {
      const error = new HttpError(
        'Could not find disinfection for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ disinfection: disinfection });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a disinfection.',
      500
    );

    return next(error);
  }
};

const createDisinfection = async (req, res, next) => {
  const disinfectionData = new Disinfection(req.body);

  try {
    const createdDisinfection = await disinfectionData.save();

    if (!createdDisinfection) {
      const error = new HttpError(
        'Could not find disinfection for the provided id.',
        404
      );

      return next(error);
    }

    res.status(201).json({ disinfection: createdDisinfection });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a disinfection.',
      500
    );

    return next(error);
  }
};

const updateDisinfection = async (req, res, next) => {
  const id = req.params.id;
  const disinfectionData = req.body;

  let disinfection;
  try {
    disinfection = await Disinfection.findById(id);

    if (!disinfection) {
      const error = new HttpError(
        'Could not find disinfection for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a disinfection.',
      500
    );

    return next(error);
  }

  Object.keys(disinfectionData).forEach(key => {
    disinfection[key] = disinfectionData[key];
  });

  try {
    await disinfection.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update disinfection.',
      500
    );

    return next(error);
  }

  res.status(200).json({ disinfection: disinfection });
};

const deleteDisinfection = async (req, res, next) => {
  const id = req.params.id;

  let disinfection;
  try {
    disinfection = await Disinfection.findById(id);

    if (!disinfection) {
      const error = new HttpError(
        'Could not find disinfection for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete disinfection.',
      500
    );

    return next(error);
  }

  try {
    await disinfection.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete disinfection.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Disinfection deleted successfully.' });
};

exports.createDisinfection = createDisinfection;
exports.deleteDisinfection = deleteDisinfection;
exports.getDisinfectionByID = getDisinfectionByID;
exports.getDisinfectionList = getDisinfectionList;
exports.updateDisinfection = updateDisinfection;
