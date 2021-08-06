const mongoose = require("mongoose");

const cityScheema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("city", cityScheema);
