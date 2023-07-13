require('dotenv').config()
const express  = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });
const db = mongoose.connection
db.on('error', (error)=>console.error(error));
db.once('open', ()=>console.log('Connected to Database'))

app.use(express.json())
const UsersRouter = require('./routes/users')
const FundraiserRouter = require('./routes/fundraisers')
const GroupRouter = require('./routes/groups')
const DonationRouter = require('./routes/donations')
const FundRouter = require('./routes/funds')
const ManageCampaign = require('./routes/manageCampaign')

app.use('/users', UsersRouter)
app.use('/fundraisers', FundraiserRouter)
app.use('/groups', GroupRouter)
app.use('/donations', DonationRouter)
app.use('/funds', FundRouter)
app.use('/manageCampaign', ManageCampaign)




app.listen(3000, ()=> console.log('Server is running'))
