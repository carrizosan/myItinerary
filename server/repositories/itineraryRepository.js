const Itinerary = require("../models/ityneraryModel");

// Read
const getAll = async () => await Itinerary.find({});

// Create
const create = async (newItinerary) => {
  await newItinerary.save((err, itineraryDB) => {
    if (err) throw new Error(err);
    return itineraryDB;
  });
};

module.exports = { getAll, create };
