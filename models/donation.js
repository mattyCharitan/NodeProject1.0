const mongoose = require('mongoose');
const User = require('./user');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Donation', donationSchema);
