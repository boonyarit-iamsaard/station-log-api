const HttpError = require('../models/http-error');
const HandlingRecord = require('../models/handling-model');

const getHandlingRecords = async (req, res, next) => {
  let handlingRecords;
  try {
    handlingRecords = await HandlingRecord.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching handling records failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({ handlingRecords: handlingRecords });
};

const getHandlingRecordByID = async (req, res, next) => {
  const handlingRecordID = req.params.id;

  let handlingRecord;
  try {
    handlingRecord = await HandlingRecord.findById(handlingRecordID);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a handling record.',
      500
    );
    return next(error);
  }

  if (!handlingRecord) {
    const error = new HttpError(
      'Could not find handling record for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ handlingRecord: handlingRecord });
};

const createHandlingRecord = async (req, res, next) => {
  const handlingRecord = new HandlingRecord(req.body);

  try {
    const createdHandlingRecord = await handlingRecord.save();

    if (!createdHandlingRecord) {
      const error = new HttpError(
        'Could not find a handling record for the provided id.',
        404
      );
      return next(error);
    }

    res.status(201).json({ handlingRecord: createdHandlingRecord });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a handling record.',
      500
    );
    return next(error);
  }
};

const updateHandlingRecord = async (req, res, next) => {
  const handlingRecordID = req.params.id;
  const handlingRecordData = req.body;

  let handlingRecord;
  try {
    handlingRecord = await HandlingRecord.findByIdAndUpdate(
      handlingRecordID,
      handlingRecordData,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    if (!handlingRecord) {
      const error = new HttpError(
        'Could not find a handling record for the provided id.',
        404
      );
      return next(error);
    }

    res.json({ handlingRecord: handlingRecord });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a handling record.',
      500
    );
    return next(error);
  }
};

const deleteHandlingRecord = async (req, res, next) => {
  const handlingRecordID = req.params.id;

  let handlingRecord;
  try {
    handlingRecord = await HandlingRecord.findById(handlingRecordID);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete a handling record.',
      500
    );
    return next(error);
  }

  if (!handlingRecord) {
    const error = new HttpError(
      'Could not find handling record for this id.',
      404
    );
    return next(error);
  }

  try {
    await handlingRecord.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete a handling record.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Handling record deleted successfully.' });
};

exports.getHandlingRecords = getHandlingRecords;
exports.getHandlingRecordByID = getHandlingRecordByID;
exports.createHandlingRecord = createHandlingRecord;
exports.updateHandlingRecord = updateHandlingRecord;
exports.deleteHandlingRecord = deleteHandlingRecord;
