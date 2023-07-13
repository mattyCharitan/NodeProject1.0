const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');

router.post('/', async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    console.log(`${donation.donor} donated ${donation.amount}`);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve donations' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve donation' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update donation' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }
    res.json({ message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete donation' });
  }
});

module.exports = router;
