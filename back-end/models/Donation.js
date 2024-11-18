const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  transactionId: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', DonationSchema);