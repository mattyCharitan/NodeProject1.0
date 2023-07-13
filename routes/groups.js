const express = require('express');
const router = express.Router();
const Group = require('../models/group');

router.get('/', async (req, res) => {
  try{const groups = await Group.find();
  res.json(groups);}
  catch(err){
    res.status(500).json({error: err.message})
  }
});

router.post('/', async (req, res) => {
  const group = new Group({
    name: req.body.name,
    members: [],
    donated: req.body.donated,
    goal: req.body.goal

  });
  await group.save();
  res.json(group);
});

router.get('/:id', async (req, res) => {
  const group = await Group.findById(req.params.id);
  res.json(group);
});

router.put('/:id', async (req, res) => {
  const group = await Group.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(group);
});

router.delete('/:id', async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ message: 'Group deleted' });
});

module.exports = router;
