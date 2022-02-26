const express = require('express')
const Appointment = require('../models/appointment.model')
const Doctor = require('./../models/doctor.model')
const Patient = require('./../models/patient.model')

const router = express.Router()

router.get('/', async (req, res) => {
  const doctors = await Doctor.find()
  const patients = await Patient.find()
  res.render('appointment/create', { doctors, patients })
})

router.post('/', async (req, res) => {
  await Appointment.create({
    doctor: req.body.doctor,
    patient: req.body.patient,
    date: req.body.date,
    prescription: req.body.prescription,
    symptoms: req.body.symptoms,
  })
  res.redirect('/appointment')
})


router.get('/readAll', async (req, res) => {
  const appointments = await Appointment.find()
    .populate('doctor')
    .populate('patient') 

  //const doctors = await (await Doctor.find()
  // const patients = await Patient.find()
  res.render('appointment/readAll', { appointments })  
})

router.post('/readAll', async (req, res) => {
  res.render('appointment/readAll')
})

module.exports = router
