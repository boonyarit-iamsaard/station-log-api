const mongoose = require('mongoose');

const handoverDetails = new mongoose.Schema({
  recordDate: {
    type: String,
    required: true,
  },
  recordBy: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  isAcknowledged: {
    type: Boolean,
    default: false,
  },
  acknowledgedBy: {
    type: String,
  },
  acknowledgedDate: {
    type: String,
  },
});

const aogHandoverSchema = new mongoose.Schema(
  {
    fltDate: {
      type: String,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    fltno: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
    },
    tail: {
      type: String,
      required: true,
    },
    acreg: {
      type: String,
      required: true,
    },
    details: [handoverDetails],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AogHandover', aogHandoverSchema);
