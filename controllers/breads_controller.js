const express = require('express')
// DEPENDENCIES
const methodOverride = require('method-override')
const breads = express.Router()
const Bread = require('../models/bread.js')
//require baker
const Baker = require('../models/baker.js')

// MIDDLEWARE
breads.use(methodOverride('_method'))

//refactor some other .thens to be async/await!
// INDEX
breads.get('/', async (req, res) => {
  //find all bakers
  //add .lean() to save memory usage
  const foundBakers = await Baker.find().lean()
  //find all breads
  // add .limit(number) to limit the amount of breads loaded at once
  // add .lean() to save memory usage
  const foundBreads = await Bread.find().limit(4).lean()
    //However, what if users actually want to see the entire list? 
    //We could create a custom route for a "See All Breads" button that 
    //queries the breads without the limit and reloads the page with all the breads. 
    //Alternatively, we could also try utilizing the skip method to paginate through 
    //all the breads in small chunks at a time rather than immediately displaying 
    //all breads. All this to say, there are many ways to solve that problem. 
    //We won't get to either of them, but if you're interested try tackling it on 
    //your own time as a personal bonus!
  //renders page
  console.log(foundBreads)
  res.render('index', {
      breads: foundBreads,
      bakers: foundBakers,
      title: 'Index Page'
  })
})


// NEW
//New must be ABOVE the SHOW route (why?)
breads.get('/new', (req, res) => {
    //gathers the bakers
    Baker.find()
      //passes promise callback a variable of foundBakers
      .then(foundBakers => {
        //sends all the baker data to our new view
        res.render('new', {
          bakers: foundBakers
        })
      })
})

// EDIT
//Edit must be ABOVE show route because of the parameter thing
//the show route would override if it's first
//more specific on top, less specific on bottom
breads.get('/:id/edit', (req, res) => {
  //get access to all the bakers
  Baker.find()
  .then(foundBakers => {
      Bread.findById(req.params.id) 
        .then(foundBread => { 
          res.render('edit', {
            bread: foundBread,
            bakers: foundBakers
          })
        })
  })

})

// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    //get baker's data through populate
    .populate('baker')
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      })
      //renders 404 page is promise fails
      .catch(err => {
        res.render('404')
      })
})

// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE
// Delete function won't work unless you install stuff in terminal
//In terminal type: npm install method-override
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})

module.exports = breads
