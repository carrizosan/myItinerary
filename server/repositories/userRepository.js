const User = require("../models/userModel");

// Read
const getAll = async () => await User.find({});
const getUserByEmail = async (mail) => await User.findOne({ mail: mail });

// Create
const create = async (newUser) => {
  await newUser.save((err, userDB) => {
    if (err) throw new Error(err);
    return userDB;
  });
};

module.exports = { getAll, getUserByEmail, create };
