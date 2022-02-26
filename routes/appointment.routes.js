const express = require("express");
const Appointment = require("../models/appointment.model");
const Doctor = require ('./../models/doctor.model');
const Patient = require('./../models/patient.model');

const router = express.Router();

router.get('/', (req, res) => {
res.render('appointment/create')
});





module.exports = router;