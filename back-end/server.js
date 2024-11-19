const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
const reportRoutes = require('./routes/reportRoutes');
const donationRoutes = require('./routes/Donation');
const requestRoutes = require('./routes/requestRoutes');

// Use Routes
app.use('/api/report', reportRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/request', requestRoutes);

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
