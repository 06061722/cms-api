const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = new express()

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const db = require('./config/keys').mongoURl

mongoose.connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passpost')(passport)


app.get('/', (req, res) => {
  res.send('Hello QiaoQiao')
})


app.use('/api/users', users)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})