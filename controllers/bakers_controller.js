// dependencies
//require express
const express = require('express');
//call router express method and save it to baker variable
const baker = express.Router();
//require baker model file
Baker = require('../models/baker.js')
//require baker seed file
bakerSeedData = require('../models/baker_seed.js')

//INSERT MANY SEED DATA
//get route goes to /data/seed
baker.get('/data/seed', (req, res) => {
    //callback calls for insertMany method and passes the seed file
    Baker.insertMany(bakerSeedData)
        //then redirect to /breads
        .then(res.redirect('/breads'))
})


//export baker router
module.exports = baker