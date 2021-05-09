const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskNo: {
      type: String,
    },
    taskDetails: {
      type: String,
    },
    hour: {
      eng: {
        type: Number,
        default: 0,
      },
      mech: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const handlingSchema = new mongoose.Schema(
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
    tasks: [taskSchema],
    eic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('HandlingRecord', handlingSchema);