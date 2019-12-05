const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI, port } = require('./config/environment')
const router = require('./router')
const errorHandler = require('./lib/errorHandler')

// Need to connect to mongo with mongoose, to start interacting with our DB in javascript
mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))

// Create our express server
const app = express()

// Set up our middleware
app.use(bodyParser.json())

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

app.use('/api', router)

app.use('/*', (req, res) => res.status(404).json({ message: 'Not Found' }))

// Listen on our port!
app.listen(port, () => console.log(`We are good to go on port ${port}`))

module.exports = app