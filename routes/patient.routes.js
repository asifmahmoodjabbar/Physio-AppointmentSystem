const express = require('express');

const Patient = require ('../models/patient.model');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('patient/create')
});

router.post('/', async (req, res) => {
  await Patient.create({
    name: req.body.name,    
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,    
  })
  res.redirect('patient/profile')
})


router.get('/profile', async (req, res) => {
  const patients = await Patient.find()
  res.render('patient/profile', { patients })
})

router.post('/profile', async (req, res) => {
  res.render('patient/profile')
})






module.exports = router;