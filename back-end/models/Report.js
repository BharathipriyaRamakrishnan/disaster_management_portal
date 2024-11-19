const mongoose = require('mongoose');

// Define the schema for disaster reports
const reportSchema = new mongoose.Schema({
  disasterType: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  date: { type: Date, default: Date.now }
});

// Create and export the Report model
module.exports = mongoose.model('Report', reportSchema);
