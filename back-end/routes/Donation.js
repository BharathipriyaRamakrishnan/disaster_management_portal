const express = require('express');
const Donation = require('../models/Donation');
const router = express.Router();

// POST: Submit Donation
router.post('/', async (req, res) => {
  const { name, number, email, transactionId, amount } = req.body;

  // Validation
  if (!name || !number || !email || !transactionId || !amount) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const donation = new Donation({ name, number, email, transactionId, amount });
    await donation.save();
    res.status(201).json({ message: 'Donation details submitted successfully.' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Error submitting donation. Please try again.' });
  }
});

module.exports = router;