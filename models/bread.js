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
    //to have a one-to-many relationship, need Schema.Types.ObjectID
    type: Schema.Types.ObjectID,
    //refers to Baker model
    ref: 'Baker'
  }
})

// Helper Methods
//instance method
breadSchema.methods.getBakedBy = function(){
  //after using .populate(), need to switch from this.baker to this.baker.name
  //add getFullYear() at the end of startDate to get a cleaner year
  return `${this.name} was baked with love by ${this.baker.name}, who
  has been with us since ${this.baker.startDate.getFullYear()}`
}



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
  