// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// Schema
const breadSchema = new Schema({
  //how to make it required
  name: { type: String, required: true },
  //shorthand
  hasGluten: Boolean,
  //how to add a default
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  baker: {
    type: String,
    //enum means only the following names can be options
    //important to have even if the front-end only has options because
    //malicious users could mess with it still
    enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
  }
})




// must create a model in order to use the schema
const Bread = mongoose.model('Bread', breadSchema)

// Export Bread
module.exports = Bread


// KEEPING FOR POSTERITY!
// module.exports = [
//     {
//       name: 'Rye',
//       hasGluten: true,
//       image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//     },
//     {
//       name: 'French',
//       hasGluten: true,
//        image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     },
//     {
//       name: 'Gluten-Free',
//       hasGluten: false,
//       image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
//     },
//     {
//       name: 'Pumpernickel',
//       hasGluten: true,
//       image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
//     }
//   ]
  