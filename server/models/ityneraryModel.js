const mongoose = require("mongoose");

const itineraryScheema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  activities: {
    type: [
      {
        name: String,
        img: String,
      },
    ],
  },
  authorName: {
    type: String,
    required: true,
  },
  authorPic: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  duration: {
    type: Number,
    min: 1,
    required: true,
  },
  likes: {
    type: String,
    default: 0,
  },
  hashtags: {
    type: [String],
  },
  comments: {
    type: [
      {
        userId: {
          type: mongoose.ObjectId,
          ref: "User",
        },
        text: String,
        userName: String,
        userPic: String,
      },
    ],
  },
  usersLike: {
    type: [String],
  },
  cityId: {
    type: mongoose.ObjectId,
    ref: "City",
  },
});

module.exports = mongoose.model("itinerary", itineraryScheema);
