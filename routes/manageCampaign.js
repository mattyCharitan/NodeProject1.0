const express = require('express');
const router = express.Router();
const Fund = require('../models/fund');
const Donation = require('../models/donation');


router.get('/:id', async (req, res) => {
    try {
        const fund = await Fund.findById(req.params.id).select('name data goal donated');
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }
        res.json(fund);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:id/groups', async (req, res) => {
    try {
        const fund = await Fund.findById(req.params.id).select('groups').populate('groups');
        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }
        res.json(fund);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id/donations', async (req, res) => {
    try {
        const fund = await Fund.findById(req.params.id)
            .select('groups')
            .populate({
                path: 'groups',
                populate: {
                    path: 'members',
                    populate: [
                        {
                            path: 'user',
                            model: 'User' // Replace 'User' with the actual model name for users
                        },
                        {
                            path: 'donations',
                            model: 'Donation', // Replace 'Donation' with the actual model name for donations
                            populate: {
                                path: 'donor',
                                model: 'User' // Replace 'Donor' with the actual model name for donors
                            }
                        }
                    ]
                }
            });

        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }
        
        // Loop through groups
        const groupData = [];
        for (const group of fund.groups) {
            const membersData = [];
            // Loop through members
            for (const member of group.members) {
                const donationsData = member.donations.map(donation => ({
                    // Return relevant donation fields
                    amount: donation.amount,
                    donor: donation.donor.name 
                }));
                const memberName = member.user ? member.user.name : 'Unknown'; // Use a default value when 'name' is undefined
                membersData.push({
                    id: member._id,
                    name: memberName,
                    donations: donationsData
                });
            }
            groupData.push({
                // Return relevant group fields
                id: group._id,
                name: group.name,
                members: membersData
            });
        }
        
        res.json(groupData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});






  
  
  
  
  


module.exports = router;
