const express = require('express');
const router = express.Router();
const Fund = require('../models/fund');
const Donation = require('../models/donation');
const Fundraiser = require('../models/fundraiser');
const Group = require('../models/group');




// Create a new fund
router.post('/', async (req, res) => {
  try {
    const fund = await Fund.create(req.body);
    res.status(201).json(fund);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Get all funds
router.get('/', async (req, res) => {
  try {
    const funds = await Fund.find().populate('groups');
    res.json(funds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single fund
router.get('/:id', async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id).populate('groups');
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    res.json(fund);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    if (req.body.name != null) {
      fund.name = req.body.name;
    }
    if (req.body.data != null) {
      fund.data = req.body.data;
    }
    if (req.body.goal != null) {
      fund.goal = req.body.goal;
    }
    if (req.body.donated != null) {
      fund.donated = req.body.donated;
    }
    if (req.body.groups != null) {
      fund.groups = req.body.groups;
    }
    const updatedFund = await fund.save();
    res.json(updatedFund);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);
    if (!fund) {
      return res.status(404).json({ message: 'Fund not found' });
    }
    await fund.deleteOne();
    res.json({ message: 'Fund deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/:groupId/:fundraiserId', async (req, res) => {
  const donation = new Donation({
    donor: req.body.donor,
    amount: parseFloat(req.body.amount) 
  });

  try {
    const newDonation = await donation.save();
    const myFundraiser = await Fundraiser.findByIdAndUpdate(req.params.fundraiserId);
    
    const myGroup = await Group.findByIdAndUpdate(req.params.groupId);
    myGroup.donated += newDonation.amount;
    await myGroup.save();

    const myFound= await Fund.findByIdAndUpdate(req.params.id);
    myFound.donated += newDonation.amount;
    await myFound.save();

    myFundraiser.raised += newDonation.amount;
    myFundraiser.donations.push(newDonation._id);
    const fundraiser = await myFundraiser.save();

    res.status(200).send(fundraiser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
