const express = require('express');
const Patient = require ('../models/patient.model');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('patient/create')
})





module.exports = router;