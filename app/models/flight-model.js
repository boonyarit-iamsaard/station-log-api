const mongoose = require('mongoose');

const extraEquipmentSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
});

const taskSchema = new mongoose.Schema({
  taskNo: {
    type: String,
  },
  taskDetails: {
    type: String,
    required: true,
  },
  deferral: {
    type: String,
  },
  deferralNumber: {
    type: String,
  },
  deferralAction: {
    type: String,
  },
  engineerHours: {
    type: Number,
    default: 0,
  },
  mechanicHours: {
    type: Number,
    default: 0,
  },
});

const chargeableServiceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    default: 0,
  },
  engineerHours: {
    type: Number,
    default: 0,
  },
  mechanicHours: {
    type: Number,
    default: 0,
  },
});

const assignedDelaySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

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
    ata: {
      type: String,
    },
    atd: {
      type: String,
    },
    bay: {
      type: String,
    },
    check1: {
      type: String,
      required: true,
    },
    check2: {
      type: String,
    },
    afac: {
      type: Number,
      default: 0,
    },
    water: {
      type: Boolean,
      default: false,
    },
    lavatory: {
      type: Boolean,
      default: false,
    },
    extraGroundEquipments: [extraEquipmentSchema],
    tasks: [taskSchema],
    chargeableServices: [chargeableServiceSchema],
    assignedDelays: [assignedDelaySchema],
    engineer: {
      type: String,
      required: true,
    },
    mechanic1: {
      type: String,
      required: true,
    },
    mechanic2: {
      type: String,
    },
    recordBy: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Flight', flightSchema);
