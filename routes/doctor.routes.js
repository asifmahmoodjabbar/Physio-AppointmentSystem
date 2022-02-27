const express = require("express");
const req = require("express/lib/request");
//const doctorModel = require("../models/doctor.model");
const Doctor = require("../models/doctor.model");

const router = express.Router();

router.get('/', (req, res) => {
  res.render('doctor/create')
});



router.post('/', async (req, res) => {
await Doctor.create({
  name: req.body.name,  
  phoneNumber: req.body.phoneNumber,
  email: req.body.email,
  speciality: req.body.speciality,
});
res.redirect('doctor/profile');
});



router.get('/profile', async(req, res) => {
  const doctors = await Doctor.find()
  res.render('doctor/profile', {doctors})
})

router.post('/profile', async (req, res) => {
  res.render('doctor/profile')
})
/*
router.get'/profile/:id', async(req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id)
  res.render('edit', {doctor}) 
})
*/
module.exports = router;