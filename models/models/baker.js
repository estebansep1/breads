//DEPENDENCIES 
const mongoose = require('mongoose') 
const baker = require('../../controllers/bakers_controller.js')
const { Schema } = mongoose 

// schema
const bakerSchema = new Schema({
  name: {
      type: String,
      required: true,
      enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
  }, 
  startDate: {
      type: Date,
      required: true
  },
  bio: {
    type: String
  }
})

// model and export 
const Baker = mongoose.model('Baker', bakerSchema)

module.exports = Baker