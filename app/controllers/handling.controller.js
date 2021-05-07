const db = require('../models');
const HandlingRecord = db.handlingRecord;

exports.findAll = async (req, res) => {
  try {
    const handlingRecords = await HandlingRecord.find();

    res.json({
      message: 'Handling records fetched successfully.',
      handlingRecords: handlingRecords,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = (req, res) => {
  res.json({
    message: 'Handling record fetched successfully.',
    handlingRecord: res.handlingRecord,
  });
};

exports.create = async (req, res) => {
  const handlingRecord = new HandlingRecord(req.body);

  try {
    const newHandlingRecord = await handlingRecord.save();

    res.status(201).json({
      message: 'Handling record created successfully.',
      handlingRecord: newHandlingRecord,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedHandlingRecord = await HandlingRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.json({
      message: 'Handling record updated successfully.',
      handlingRecord: updatedHandlingRecord,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await res.handlingRecord.remove();

    res.json({ message: 'Handling record deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
