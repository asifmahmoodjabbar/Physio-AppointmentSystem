const express = require('express')
const Appointment = require('../models/appointment.model')
const Doctor = require('./../models/doctor.model')
const Patient = require('./../models/patient.model')

const router = express.Router()

// Create Appointments
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
 res.redirect('appointment/viewappointments')
})

//View the scheduled appointments
router.get('/viewappointments', async (req, res) => {
  const appointments = await Appointment.find()
    .populate('doctor')
    .populate('patient')  
  res.render('appointment/viewappointments', { appointments })
})


// Update Appointments
router.post('/viewappointments', async (req, res) => {   
  res.render('appointment/viewappointments', {minDate})
})

router.patch('/appointment/:id', async (req, res) => {
  try {
    await viewappointments.findByIdAndUpdate(request.params.id, request.body)
    await viewappointments.save()
    res.send(viewappointments)
  } catch (error) {
    response.status(500).send(error)
  }
})

// form for updating an existing post
router.get('/edit/:id', async (req, res) => {
  const appointments = await Appointment.findById(req.params.id)
    .populate('doctor')
    .populate('patient')  
   
  res.render('appointment/editAppointment', { appointments })
})

// route for handling the update of an existing post
router.post(
  '/edit/:id', (req, res, next) => {
  //  console.log(req.body)
    Appointment.findByIdAndUpdate(req.params.id, {
      // doctor: req.body.doctor,
      // patient: req.body.patient,
      date: req.body.date,
      prescription: req.body.prescription,
      symptoms: req.body.symptoms      
    }).then(() => {
      res.redirect('/appointment/viewappointments')
    })
  
  },
)



router.get('/delete/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id)
  res.redirect('/appointment/viewappointments')
})





module.exports = router
