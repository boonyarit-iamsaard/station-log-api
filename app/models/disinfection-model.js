const mongoose = require('mongoose');

const disinfectionSchema = new mongoose.Schema(
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
    aircraftType: {
      type: String,
      required: true,
    },
    mechanic1: {
      type: String,
      required: true,
    },
    mechanic2: {
      type: String,
      required: true,
    },
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
    chemicalUsage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Disinfection', disinfectionSchema);
