const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    require: true,
  },
  lname: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  psw: {
    type: String,
    require: true,
  },
  psw2: {
    type: String,
    require: true,
  },
});

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;
