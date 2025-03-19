// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
//   resourceType: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Request', requestSchema);
