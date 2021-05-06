module.exports = mongoose => {
  const actionSchema = mongoose.Schema({
    status: {
      type: Boolean,
      default: false,
    },
    number: {
      type: String,
    },
    by: {
      type: String,
    },
  });

  const Spare = mongoose.model(
    'spare',
    mongoose.Schema(
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
        type: {
          type: String,
          required: true,
        },
        part: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
        serial: {
          type: String,
          required: true,
        },
        grn: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        store: {
          type: String,
          required: true,
        },
        usedBy: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        issued: {
          type: actionSchema,
          default: () => ({}),
        },
        returned: {
          type: actionSchema,
          default: () => ({}),
        },
        transferred: {
          type: actionSchema,
          default: () => ({}),
        },
      },
      {
        timestamps: true,
      }
    )
  );

  return Spare;
};
