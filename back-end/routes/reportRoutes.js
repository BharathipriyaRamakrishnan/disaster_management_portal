const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const axios = require('axios'); // For making API requests
const Report = require('../models/Report');
const Rescuer = require('../models/Rescuer');
require('dotenv').config();

// Twilio Client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Endpoint to handle report submissions
router.post('/', async (req, res) => {
  const { disasterType, description, location } = req.body;

  // Check for required fields
  if (!disasterType || !description || !location || !location.latitude || !location.longitude) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // Reverse Geocode to get address from latitude and longitude
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await axios.get(geocodeUrl);

    //let address = 'Address not found';
    if (geocodeResponse.data.status === 'OK' && geocodeResponse.data.results.length > 0) {
      address = geocodeResponse.data.results[0].formatted_address;
    }

    // Construct the message for SMS
    const messageBody = `
    New Disaster Report:
    Type: ${disasterType}
    Description: ${description}
    Google Maps Link: https://www.google.com/maps?q=${location.latitude},${location.longitude}
    `;

    // Fetch all rescuers' phone numbers from the database
    const rescuers = await Rescuer.find();
    const rescuerNumbers = rescuers.map((rescuer) => rescuer.mobile);

    // Send SMS to each rescuer
    rescuerNumbers.forEach((toNumber) => {
      client.messages
        .create({
          body: messageBody,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: toNumber.trim(),
        })
        .then((message) => console.log(`Message sent to ${toNumber}: ${message.sid}`))
        .catch((error) => console.error(`Failed to send to ${toNumber}:`, error));
    });

    // Store the report in MongoDB
    const newReport = new Report({
      disasterType,
      description,
      location,
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





// reportRoutes.js
router.get('/total-reports', async (req, res) => {
  try {
    const reportData = await Report.aggregate([
      { $group: { _id: { $month: "$date" }, total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    const totalReports = reportData.map(item => ({
      month: new Date(0, item._id-1).toLocaleString('en', { month: 'long' }),
      total: item.total,
    }));

    res.json(totalReports);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/unresolved-reports', async (req, res) => {
  try {
    // Fetch reports where "resolved" is false
    const unresolvedReports = await Report.find({ resolved: false });
    res.status(200).json(unresolvedReports);
  } catch (error) {
    console.error('Error retrieving unresolved reports:', error);
    res.status(500).json({ message: 'Failed to retrieve unresolved reports.' });
  }
});

//////////////////////////

// Update report as resolved
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(updatedReport);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    res.json({ totalReports });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve report stats", error: err.message });
  }
});

module.exports = router;

//Location: ${address} 