const mongoose = require('mongoose');
const Group = require('./group'); 

const fundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  donated: {
    type: Number,
    default: 0
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }]
});

module.exports = mongoose.model('Fund', fundSchema);
