const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
    otherAirline: {
      type: String,
    },
    fltno: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
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
    check: {
      type: String,
      required: true,
    },
    otherCheck: {
      type: String,
    },
    eic: {
      type: String,
      required: true,
    },
    handOver: {
      type: String,
    },
    ata: {
      type: String,
    },
    atd: {
      type: String,
    },
    bay: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Flight', flightSchema);
