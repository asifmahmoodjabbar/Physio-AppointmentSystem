const mongoose = require ('mongoose');

const appointmentSchema = mongoose.Schema({
  prescription: {
    type: String,
  },
  symptoms: {
    type: String,
  },
  doctor: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Patient",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);   