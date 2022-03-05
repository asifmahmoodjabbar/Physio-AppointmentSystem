const express = require('express');

const Patient = require ('../models/patient.model');

const router = express.Router();

//Create Patient
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

//View Patient
router.get('/profile', async (req, res) => {
  const patients = await Patient.find()
  res.render('patient/profile', { patients })
})

router.post('/profile', async (req, res) => {
  res.render('patient/profile')
})

//Update doctor profile
router.get('/profile/:id', async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id)
  res.render('patient/updatePatient', { patient })
})

router.post('/profile/:id', (req, res) => {
  //  console.log(req.params.id)
  Patient.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,    
  }).then(() => {
    res.redirect('/patient/profile')
  })
})




module.exports = router;