//dependencies
//require mongoose
const mongoose = require('mongoose');
// shorthand for schema
const { Schema } = mongoose;

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
});

//model and export
const Baker = mongoose.model('Baker', bakerSchema);
module.exports = Baker