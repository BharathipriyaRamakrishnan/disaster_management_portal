const mongoose = require('mongoose');

const rescuerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

const Rescuer = mongoose.model('Rescuer', rescuerSchema);

module.exports = Rescuer;
