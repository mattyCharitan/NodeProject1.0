const express = require("express");
const router = express.Router();
const Fundraiser = require('../models/fundraiser');
const User = require('../models/user');
const Donation = require('../models/donation');
const userRouter = require('./users');



router.get('/',  async (req, res) =>{
   try{
    const fundraisers = await Fundraiser.find()
    res.send(fundraisers)

   }
   catch(err){
    res.status(500).send({message: err.message})
   }

} )

router.get('/:id', getFundraiser ,(req, res) =>{
    res.send(res.fundraiser)   
});

router.post('/', async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        

      });
  
      const newUser = await user.save();
      const fundraiser = new Fundraiser({
        donations: [],
        user: newUser._id,
        goal:  req.body.goal,
      });
  
      const newFundraiser = await fundraiser.save();
  
      res.status(201).json(newFundraiser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post('/:id', async (req, res) => {
    const donation = new Donation({
      donor: req.body.donor,
      amount: parseFloat(req.body.amount) 
    });
  
    try {
      const newDonation = await donation.save();
      const myFundraiser = await Fundraiser.findByIdAndUpdate(req.params.id);
      myFundraiser.raised += newDonation.amount;
      myFundraiser.donations.push(newDonation._id);
      const fundraiser = await myFundraiser.save();
      res.status(200).send(fundraiser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  


  router.put('/:id', getFundraiser, async (req, res) => {
    try {
      res.fundraiser.donations = req.body.donations;
      if(req.body.goal){
        res.fundraiser.goal = req.body.goal
      }
      await res.fundraiser.save();
  
      const user = await User.findById(res.fundraiser.user);
  
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.phone) {
        user.phone = req.body.phone;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
  
      await user.save();
  
      res.status(200).json({ fundraiser: res.fundraiser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  
  
  

router.delete('/:id', getFundraiser,  async(req, res) =>{
    try{
        
      try{
        const user = await User.findById(res.fundraiser.user);
        await user.deleteOne();
      }
      catch(err){
        return res.status(500).json({message: err.message})
      }
        await res.fundraiser.deleteOne()
        res.json({message: 'Deleted fundraiser'})

    } catch(err){
        res.status(500).json({message: err.message})

    }
    
} )

async function getFundraiser(req, res, next){
    let fundraiser
    try{
        fundraiser = await Fundraiser.findById(req.params.id)
      if(fundraiser == null)  {
        return res.status(404).json({message: 'cannot find fundraiser'})
      }

    }

    catch(err){
        return res.status(500).json({message: err.message})

    }
    res.fundraiser = fundraiser;
    next()

}

module.exports = router