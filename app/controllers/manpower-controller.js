const Manpower = require('../models/manpower-model');
const HttpError = require('../models/http-error');

const getManpowerRecords = async (req, res, next) => {
  try {
    const manpowerRecords = await Manpower.find();

    res.json({ manpowerRecords: manpowerRecords });
  } catch (err) {
    const error = new HttpError(
      'Fetching manpower records failed, please try again later.',
      500
    );

    return next(error);
  }
};

const getManpowerRecordByID = async (req, res, next) => {
  const id = req.params.id;

  try {
    const manpowerRecord = await Manpower.findById(id);

    if (!manpowerRecord) {
      const error = new HttpError(
        'Could not find manpower record for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ manpowerRecord: manpowerRecord });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a manpower record.',
      500
    );

    return next(error);
  }
};

const createManpowerRecord = async (req, res, next) => {
  const manpowerRecordData = new Manpower(req.body);

  try {
    const manpowerRecord = await manpowerRecordData.save();

    if (!manpowerRecord) {
      const error = new HttpError('Could not create a manpower record.', 404);

      return next(error);
    }

    res.status(201).json({ manpowerRecord: manpowerRecord });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not create a manpower record.',
      500
    );

    return next(error);
  }
};

const updateManpowerRecord = async (req, res, next) => {
  const id = req.params.id;
  const manpowerRecordData = req.body;

  let manpowerRecord;
  try {
    manpowerRecord = await Manpower.findById(id);

    if (!manpowerRecord) {
      const error = new HttpError(
        'Could not find manpower record for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a manpower record.',
      500
    );

    return next(error);
  }

  Object.keys(manpowerRecordData).forEach(key => {
    manpowerRecord[key] = manpowerRecordData[key];
  });

  try {
    await manpowerRecord.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update manpower record.',
      500
    );

    return next(error);
  }

  res.status(200).json({ manpowerRecord: manpowerRecord });
};

const deleteManpowerRecord = async (req, res, next) => {
  const id = req.params.id;

  let manpowerRecord;
  try {
    manpowerRecord = await Manpower.findById(id);

    if (!manpowerRecord) {
      const error = new HttpError(
        'Could not find manpower record for this id.',
        404
      );

      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find manpower record.',
      500
    );

    return next(error);
  }

  try {
    await manpowerRecord.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete manpower record.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Manpower record deleted successfully.' });
};

exports.createManpowerRecord = createManpowerRecord;
exports.deleteManpowerRecord = deleteManpowerRecord;
exports.getManpowerRecordByID = getManpowerRecordByID;
exports.getManpowerRecords = getManpowerRecords;
exports.updateManpowerRecord = updateManpowerRecord;
