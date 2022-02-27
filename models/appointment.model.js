const mongoose = require ('mongoose');

const appointmentSchema = mongoose.Schema({
  doctor: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  patient: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Patient',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  symptoms: {
    type: String,
  },
  prescription: {
    type: String,
  },
})

module.exports = mongoose.model("Appointment", appointmentSchema);   