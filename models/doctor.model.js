const mongoose = require("mongoose");

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
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: email,
    required: true,
    unique: true,
  },
  speciality: {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
