const Itinerary = require("../models/ityneraryModel");

// Read
const getAll = async () => await Itinerary.find({});
const getOne = async (id) => await Itinerary.findById(id);
const getByCityId = async (cityId) => await Itinerary.find({ cityId: cityId });

// Create
const create = async (newItinerary) => {
  await newItinerary.save((err, itineraryDB) => {
    if (err) throw new Error(err);
    return itineraryDB;
  });
};

module.exports = { getAll, getOne, getByCityId, create };
