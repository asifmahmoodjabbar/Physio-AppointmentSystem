const express = require("express");
const Appointment = require("../models/bookAppointment.model");

const router = express.Router();

router.get('/', (req, res) => {
res.render('appointment')
});





module.exports = router;