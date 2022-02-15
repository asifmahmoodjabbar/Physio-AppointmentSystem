const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
      type: email,
      required: true,
      unique: true,
  },
});
