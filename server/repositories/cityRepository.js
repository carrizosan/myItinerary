const City = require("../models/cityModel");

// Read
const getAll = async () => await City.find({});
const getCityByQuery = async (name) => await City.find({ name: name });

// Create
const create = async (newCity) => {
  await newCity.save((err, cityDB) => {
    if (err) throw new Error(err);
    return cityDB;
  });
};

module.exports = { getAll, getCityByQuery, create };
