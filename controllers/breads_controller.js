const express = require('express')
// DEPENDENCIES
const methodOverride = require('method-override')
const breads = express.Router()
const Bread = require('../models/bread.js')

// MIDDLEWARE
breads.use(methodOverride('_method'))


// INDEX
breads.get('/', (req, res) => {
  res.render('Index',
    {
      breads: Bread,
      title: 'Index Page',
    }
  )
// res.send(Bread)
})


// NEW
//New must be ABOVE the SHOW route (why?)
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
//Edit must be ABOVE show route because of the parameter thing
//the show route would override if it's first
//more specific on top, less specific on bottom
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})


// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread:Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.render('404')
  }
})

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.push(req.body)
  res.redirect('/breads')
})

// DELETE
// Delete function won't work unless you install stuff in terminal
//In terminal type: npm install method-override
breads.delete('/:indexArray', (req, res) => {
  // splices the chosen indexArray out of the array
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})


module.exports = breads
