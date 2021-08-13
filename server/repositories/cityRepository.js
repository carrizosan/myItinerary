const City = require("../models/cityModel");

// Get
const getAll = async () => await City.find({});

const getOne = async (id) => await City.findById(id);

const getCityByQuery = async (name) => await City.find({ name: name });

const count = async () => await City.countDocuments();

// Create
const create = async (newCity) => {
  await newCity.save((err, cityDB) => {
    if (err) throw new Error(err);
    return cityDB;
  });
};

module.exports = {
  getAll,
  getOne,
  getCityByQuery,
  count,
  create,
};
