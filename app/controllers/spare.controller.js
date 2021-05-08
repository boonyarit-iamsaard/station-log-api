// const Spare = require('../models/spare.model');
const db = require('../models');
const Spare = db.spare;

exports.findAll = async (req, res) => {
  try {
    const spares = await Spare.find();

    res.json({
      message: 'Spares fetched successfully.',
      spares: spares,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = (req, res) => {
  res.json({
    message: 'Spare fetched successfully.',
    spare: res.spare,
  });
};

exports.create = async (req, res) => {
  const spare = new Spare(req.body);

  try {
    const newSpare = await spare.save();

    res.status(201).json({
      message: 'Spare created successfully.',
      spare: newSpare,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedSpare = await Spare.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.json({
      message: 'Spare updated successfully.',
      spare: updatedSpare,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await res.spare.remove();

    res.json({ message: 'Spare deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
