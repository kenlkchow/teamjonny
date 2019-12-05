const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI, port } = require('./config/environment')
const router = require('./router')

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))

const app = express()

app.use(bodyParser.json())

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

app.use('/api', router)

<<<<<<< HEAD
=======
// app.use(errorHandler)

>>>>>>> development
app.use('/*', (req, res) => res.status(404).json({ message: 'Not Found' }))

app.listen(port, () => console.log(`We are good to go on port ${port}`))

module.exports = app