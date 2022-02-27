const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  age: {
      type: Number,
      required: true,
  },
  phoneNumber: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
  },
});

module.exports = mongoose.model('Patient', patientSchema);