// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
require('dotenv').config();

// POST route to add a new request
router.post('/', async (req, res) => {
  try {
    const { description, location } = req.body;

    // Validation
    if (!description || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRequest = new Request({ description, location });
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  console.log('Request Body:', req.body);

});

module.exports = router;
