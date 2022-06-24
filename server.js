// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// mongoose can be called anywhere after the required mongoose
// The first argument that connect takes is the Mongo URI. 
// The second argument contains optional properties that get rid 
// of deprecation warnings.
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// MIDDLEWARE
app.use(express.static('public'))
// MIDDLEWARE
app.use(express.urlencoded({extended: true}))




// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads')
  })
  
// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Bakers (must be above 404 route)
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)
  
// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})


