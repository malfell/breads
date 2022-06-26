// dependencies
//require express
const express = require('express');
// Method override
const methodOverride = require('method-override')
//call router express method and save it to baker variable
const baker = express.Router();
//require baker model file
Baker = require('../models/baker.js')
//require baker seed file
bakerSeedData = require('../models/baker_seed.js')

// MIDDLEWARE
baker.use(methodOverride('_method'));

//INSERT MANY SEED DATA
//get route goes to /data/seed
baker.get('/data/seed', (req, res) => {
    //callback calls for insertMany method and passes the seed file
    Baker.insertMany(bakerSeedData)
        //then redirect to /breads
        .then(res.redirect('/breads'))
})

//INDEX for testing virtual
baker.get('/', (req, res) => {
    //finds all bakers
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

//SHOW
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
    //limits amount of bread shown on each baker page
    .populate({
        path: 'breads',
        options: { limit: 5 }
    })
    //resulting promise
    .then(foundBaker => {
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
})

// DELETE
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
    .then(deletedBaker => {
        res.status('303').redirect('/breads')
    })
})

//export baker router
module.exports = baker