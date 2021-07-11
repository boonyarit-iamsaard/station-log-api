const mongoose = require('mongoose');

const sickLeaveSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shift: {
    type: String,
  },
  reason: {
    type: String,
  },
  receivedBy: {
    type: String,
  },
});

const overTimeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  shift: {
    type: String,
  },
  remark: {
    type: String,
  },
  requiredBy: {
    type: String,
  },
});

const manpowerSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    sickLeaveDetails: {
      type: sickLeaveSchema,
      default: () => ({}),
    },
    overTimeDetails: {
      type: overTimeSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Manpower', manpowerSchema);
