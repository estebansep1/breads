const express = require('express')
const breads = express.Router()
const Bread = require('../models/models/bread.js')
const Baker = require('../models/models/baker.js')
const breadSeed = require('../seeds/bread-seed.js')


// INDEX
breads.get('/', (req, res) => {
  Bread.find()
      .populate('baker')
      .then(foundBreads => {
        console.log('Found bread:', foundBreads)
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})


// NEW
breads.get('/new', (req, res) => {
  Baker.find()
  .then(foundBakers => {
    res.render('new', {
      bakers: foundBakers
    })
  })
})


// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        console.log('Found bread:', foundBread)
        const bakedBy = foundBread.getBakedBy() 
        console.log(bakedBy)
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.render('notFound')
      })
    })

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})


// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})


// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(303).redirect('/breads');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error deleting bread');
    });
});


// SEED ROUTE
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(breadSeed).then(createdBreads => {
      res.redirect('/breads')
    })
})

module.exports = breads 