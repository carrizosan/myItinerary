const User = require("../models/userModel");

// Get
const getAll = async () => await User.find({});

const getUserByEmail = async (mail) => await User.findOne({ mail: mail });

// Create
const create = async (newUser) => await newUser.save();

module.exports = {
  getAll,
  getUserByEmail,
  create,
};
