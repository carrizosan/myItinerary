const City = require("../models/cityModel");

// Read
const getAll = async () => await City.find({});
const getCityByQuery = async (name) => await City.find({ name: name });
const count = async () => await City.count();

// Create
const create = async (newCity) => {
  await newCity.save((err, cityDB) => {
    if (err) throw new Error(err);
    return cityDB;
  });
};

module.exports = { getAll, getCityByQuery, count, create };
