const express = require('express')
const bakers = express.Router()
const Baker = require('../models/models/baker.js')
const bakerSeedData = require('../models/models/baker_seed.js')

console.log(typeof Baker); // Check the type of Baker
console.log(Baker); // Check the contents of Baker

// Index: 
bakers.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})                 


// Show 
bakers.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: { limit: 2 }
        })
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})


// delete
bakers.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id) 
      .then(deletedBaker => { 
        res.status(303).redirect('/breads')
      })
})


//Seed
bakers.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(createdBakers => {
            res.redirect('/breads')
        })
})



module.exports = bakers