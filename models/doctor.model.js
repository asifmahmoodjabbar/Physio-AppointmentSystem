const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  speciality: {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
