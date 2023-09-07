const express = require('express')
const bakers = express.Router()
const Baker = require('../models/models/baker.js')
const bakerSeedData = require('../models/models/baker_seed.js')


bakers.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(createdBakers => {
            res.redirect('/breads')
        })
})



module.exports = bakers