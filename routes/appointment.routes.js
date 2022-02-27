const express = require('express')
const Appointment = require('../models/appointment.model')
const Doctor = require('./../models/doctor.model')
const Patient = require('./../models/patient.model')

const router = express.Router()

router.get('/', async (req, res) => {
  const doctors = await Doctor.find()
  const patients = await Patient.find()
  const minDate = getMinDate()
  res.render('appointment/create', { doctors, patients, minDate })
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

router.get('/viewappointments', async (req, res) => {
  const appointments = await Appointment.find()
    .populate('doctor')
    .populate('patient')

  //const doctors = await (await Doctor.find()
  // const patients = await Patient.find()
  res.render('appointment/viewappointments', { appointments })
})

router.post('/viewappointments', async (req, res) => {
  res.render('appointment/viewappointments')
})

/*
// form for updating an existing post
router.get('/edit/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
  res.render('editAppointment', { appointment })
})

// route for handling the update of an existing post
router.put(
  '/:id',
  async (req, res, next) => {
    req.appointment = await Appointment.findById(req.params.id)
    next()
  },
  saveAppointmentAndRedirect('editAppointment')
)

*/
function getMinDate() {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!
  const yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = `${yyyy}-${mm}-${dd}`
  return today
}

module.exports = router
