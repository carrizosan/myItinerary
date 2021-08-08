const mongoose = require("mongoose");

const userScheema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPic: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userScheema);
