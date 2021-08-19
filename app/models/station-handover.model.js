const mongoose = require('mongoose');

const stationHandoverSchema = new mongoose.Schema(
  {
    recordDate: {
      type: String,
      required: true,
    },
    recordBy: {
      type: String,
      required: true,
    },
    acknowledgedDate: {
      type: String,
    },
    acknowledgedBy: {
      type: String,
    },
    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('StationHandover', stationHandoverSchema);
