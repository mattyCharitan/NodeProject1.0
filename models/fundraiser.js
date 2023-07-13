const mongoose = require('mongoose');
const User = require('./user'); 
const Donation = require('./donation'); 
const fundraiserSchema = new mongoose.Schema({
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  goal:{
    type: Number,
    default: 0

  },
   raised: {
    type: Number,
    default: 0
  }
});



module.exports = mongoose.model('Fundraiser', fundraiserSchema);
