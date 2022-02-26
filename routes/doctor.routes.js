const express = require("express");
const doctorModel = require("../models/doctor.model");
const Doctor = require("../models/doctor.model");

const router = express.Router();

router.get('/', (req, res) => {
  res.render('doctor/create')
});

/*
router.post('/', async (req, res) =>{
try {
  Doctor.create(req.body);
  res.redirect('/');
} catch (error) { 
  console.error(error);
  res.status(500).send('Something went wrong');
}
});
*/

router.post('/', async (req, res) => {
await Doctor.create({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  phoneNumber: req.body.phoneNumber,
  email: req.body.email,
  speciality: req.body.speciality,
});
res.render('doctor/create');
});



router.get('/profile', (req, res) => {
  res.render('doctor/profile')
})


module.exports = router;