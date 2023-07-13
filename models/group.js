const mongoose = require('mongoose');
const Fundraiser = require('./fundraiser');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fundraiser'
  }],
  goal: {
    type: Number,
    required: true
  },
  donated: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Group', groupSchema);
