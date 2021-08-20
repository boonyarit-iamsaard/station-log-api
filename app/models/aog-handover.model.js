const mongoose = require('mongoose');

const handoverDetail = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  engineer: {
    type: String,
    required: true,
  },
});

const aogHandoverSchema = new mongoose.Schema(
  {
    date: {
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
    details: [handoverDetail],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AogHandover', aogHandoverSchema);
