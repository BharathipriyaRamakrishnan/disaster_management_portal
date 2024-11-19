const express = require('express');
const Rescuer = require('../models/Rescuer');
const router = express.Router();

// @desc Fetch all rescuers
// @route GET /api/rescuers
router.get('/', async (req, res) => {
  try {
    const rescuers = await Rescuer.find();
    res.json(rescuers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Add a rescuer
// @route POST /api/rescuers
router.post('/', async (req, res) => {
  const { name, mobile, location, field, password } = req.body;

  if (!name || !mobile || !location || !field || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingRescuer = await Rescuer.findOne({ mobile });
    if (existingRescuer) {
      return res.status(400).json({ message: 'Rescuer already exists' });
    }

    const rescuer = new Rescuer({
      name,
      mobile,
      location,
      field,
      password,
    });

    const savedRescuer = await rescuer.save();
    res.status(201).json(savedRescuer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc Delete a rescuer
// @route DELETE /api/rescuers/:id
router.delete('/:id', async (req, res) => {
  try {
    const rescuer = await Rescuer.findById(req.params.id);

    if (!rescuer) {
      return res.status(404).json({ message: 'Rescuer not found' });
    }

    await rescuer.remove();
    res.json({ message: 'Rescuer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Example in Express
// PUT update rescuer details
router.put('/:id', async (req, res) => {
    const { name, mobile, location, field, password } = req.body;
    try {
      const updatedRescuer = await Rescuer.findByIdAndUpdate(
        req.params.id,
        { name, mobile, location, field, password },
        { new: true }
      );
  
      if (!updatedRescuer) {
        return res.status(404).json({ message: 'Rescuer not found' });
      }
  
      res.json(updatedRescuer);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
