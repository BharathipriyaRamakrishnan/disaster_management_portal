const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory for storing images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

const upload = multer({ storage });

// Twilio Client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define the schema for disaster reports
const reportSchema = new mongoose.Schema({
  disasterType: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  imageUrl: String, // Field for the image URL
  date: { type: Date, default: Date.now }
});

// Create a model for the disaster reports
const Report = mongoose.model('Report', reportSchema);

// Endpoint to handle report submissions with image upload
app.post('/api/report', upload.single('image'), async (req, res) => {
  const { disasterType, description, location } = req.body;
  const imageUrl = req.file ? `http://${req.headers.host}/uploads/${req.file.filename}` : null; // Construct the image URL using host

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
  Image: ${imageUrl ? `<${imageUrl}>` : 'No image provided'} // Include image link
  `;

  try {
    // Send SMS to rescuer
    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.RESCUER_PHONE_NUMBER,
    });

    // Store the report in MongoDB
    const newReport = new Report({
      disasterType,
      description,
      location,
      imageUrl // Save the image URL
    });

    await newReport.save();

    res.status(200).json({ message: 'Report sent and stored successfully.' });
  } catch (error) {
    console.error('Error sending SMS or storing report:', error);
    res.status(500).json({ message: 'Failed to send report or store in database.' });
  }
});

// Endpoint to retrieve all disaster reports
app.get('/api/report', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
