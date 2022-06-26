//dependencies
//require mongoose
const mongoose = require('mongoose');
// shorthand for schema
const { Schema } = mongoose;
//require bread.js
const Bread = require('./bread.js');

//schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        //enum means only the following names can be options
        //important to have even if the front-end only has options because
        //malicious users could mess with it still
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe'],
    },
    startDate: {
        type: Date,
        required: true,
    },
    bio: String,
    //must specify to schema that we want data to show up for virtual
}, { toJSON: { virtuals: true }});

//bakerSchema virtual
bakerSchema.virtual('breads', {
    //model's schema
    ref:'Bread',
    //field of parent that matches child's ref field value
    localField:'_id',
    //ref field on children documents
    foreignField: 'baker',
})

// hooks
// delete hook
    // write post hook on breadSchema
    // pass argument of 'findOneAndDelete'
    //pass hook a second argument that is a callback function expression
bakerSchema.post('findOneAndDelete', function() {
    Bread.deleteMany({ baker:this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
})

//model and export
const Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker