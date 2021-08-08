const User = require("../models/userModel");

// Read
const getAll = async () => await User.find({});

// Create
const create = async (newUser) => {
  await newUser.save((err, userDB) => {
    if (err) throw new Error(err);
    return userDB;
  });
};

module.exports = { getAll, create };
