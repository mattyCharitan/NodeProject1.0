const express = require("express");
const router = express.Router();
const User = require('../models/user');



router.get('/',  async (req, res) =>{
   try{
    const users = await User.find()
    res.send(users)

   }
   catch(err){
    res.status(500).send({message: err.message})
   }

} )

router.get('/:id', getUser ,(req, res) =>{
    res.send(res.user)   
} )

router.post('/', async (req, res) =>{
    const user = new User({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        
        
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
} )

router.put('/:id', getUser, async(req, res) =>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json({message:err.message });
      }

      
} )

router.delete('/:id', getUser,  async(req, res) =>{
    try{

        await res.user.deleteOne()
        res.json({message: 'Deleted User'})

    } catch(err){
        res.status(500).json({message: err.message})

    }
    
} )

async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
      if(user == null)  {
        return res.status(404).json({message: 'cannot find user'})
      }

    }

    catch(err){
        return res.status(500).json({message: err.message})

    }
    res.user = user;
    next()

}

module.exports = router