const express = require('express')
const Appointment = require('../models/appointment.model')
const Doctor = require('./../models/doctor.model')
const Patient = require('./../models/patient.model')

const router = express.Router()

// Create Appointments
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
  res.render('appointment/viewappointments')
})

router.patch('/appointment/:id', async (req, res) => {
  try {
    await viewappointments.findByIdAndUpdate(request.params.id, request.body)
    await viewappointments.save()
    response.send(viewappointments)
  } catch (error) {
    response.status(500).send(error)
  }
})




// form for updating an existing post
router.get('/edit/:id', async (req, res) => {
  const appointments = await Appointment.findById(req.params.id)
    .populate('doctor')
    .populate('patient')  
    const minDate = getMinDate()
  res.render('appointment/editAppointment', { appointments, minDate })
})

// route for handling the update of an existing post
router.post(
  '/edit/:id',
  async (req, res, next) => {
    req.appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        doctor: req.body.doctor,
        patient: req.body.patient,
        date: req.body.date,
        prescription: req.body.prescription,
        symptoms: req.body.symptoms,
      },
      function (err, response) {
        if (err) {
          console.log(err)
        } else {
          console.log('Updated User : ', response)
        }
      }
    )

   // next()
  },
  // saveAppointmentAndRedirect('viewappointments')
 // saveappointmentAndRedirect('appointment/viewappointments')
)
/*
function saveappointmentAndRedirect(template) {
  return async (req, res) => {
    // update the post with new data
    appointments.doctor = req.body.doctor,
    appointments.patient = req.body.patient,
    appointments.date = req.body.date,
    appointments.prescription = req.body.prescription,
    appointments.symptoms = req.body.symptoms,
    try {
      // try saving the post to mongodb
      await req.Appointment.save()
      res.redirect('/')
    } catch (error) {
      // if something goes wrong, redirect to the same form (updatePost or createPost)
      res.render(template, { post: req.post })
    }
  }
}

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
