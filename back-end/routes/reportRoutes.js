const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const Report = require('../models/Report');
require('dotenv').config();

// Twilio Client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const rescuerNumbers = process.env.RESCUER_PHONE_NUMBER.split(',');

// Endpoint to handle report submissions
router.post('/', async (req, res) => {
  const { disasterType, description, location } = req.body;

  // Check for required fields
  if (!disasterType || !description || !location || !location.latitude || !location.longitude) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Construct the message for SMS
  const messageBody = `
  New Disaster Report:
  Type: ${disasterType}
  Description: ${description}
  Location: Latitude ${location.latitude}, Longitude ${location.longitude}
  `;

  try {
    //Send SMS to rescuer
    rescuerNumbers.forEach((toNumber) => {
      client.messages
          .create({
              body: messageBody,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: toNumber.trim(), // Ensure no extra spaces
          })
          .then((message) => console.log(`Message sent to ${toNumber}: ${message.sid}`))
          .catch((error) => console.error(`Failed to send to ${toNumber}:`, error));
  });

    // Store the report in MongoDB
    const newReport = new Report({
      disasterType,
      description,
      location
    });

    await newReport.save();

    res.status(200).json({ message: 'Report sent and stored successfully.' });
  } catch (error) {
    console.error('Error sending SMS or storing report:', error);
    res.status(500).json({ message: 'Failed to send report or store in database.' });
  }
});

// Endpoint to retrieve all disaster reports
router.get('/', async (req, res) => {
  try {
    // Retrieve all reports from the database
    const incidents = await Report.find();

    // Send the incidents as a JSON response
    res.status(200).json(incidents);
  } catch (error) {
    console.error('Error retrieving incidents:', error);
    res.status(500).json({ message: 'Failed to retrieve incidents.' });
  }
});

module.exports = router;
