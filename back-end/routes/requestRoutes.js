// // routes/requestRoutes.js
// const express = require('express');
// const router = express.Router();
// const Request = require('../models/Request');
// require('dotenv').config();



// // POST route to add a new request
// router.post('/', async (req, res) => {
//   try {
//     const { description, location } = req.body;

//     // Validation
//     if (!description || !location) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const newRequest = new Request({ description, location });
//     await newRequest.save();
//     res.status(201).json({ message: 'Request submitted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
//   console.log('Request Body:', req.body);

// });

// module.exports = router;


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

// GET route to fetch all requests or a specific request
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find(); // Fetches all requests from the database
    res.status(200).json(requests); // Responds with the list of requests
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch a specific request by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = await Request.findById(id); // Fetches a single request by its ID

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request); // Responds with the requested item
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//////////////////////////
// Update request as completed
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});









router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalRequests = await Request.countDocuments();
    res.json({ totalRequests });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve request stats", error: err.message });
  }
});


module.exports = router;
