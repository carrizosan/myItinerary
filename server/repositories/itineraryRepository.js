const Itinerary = require("../models/ityneraryModel");

// Read
const getAll = async () => await Itinerary.find({});
const getOne = async (id) => await Itinerary.findById(id);
const getByCityId = async (cityId) => await Itinerary.find({ cityId: cityId });
const getOneByCommentId = async (id, userId) =>
  await Itinerary.findOne({ "comments._id": id, "comments.userId": userId });
const getUserLiked = async (id, userId) => await Itinerary.findOne({ _id: id, usersLike: userId });
// Create
const create = async (newItinerary) => {
  await newItinerary.save((err, itineraryDB) => {
    if (err) throw new Error(err);
    return itineraryDB;
  });
};

// Update
const updateComments = async (comment, itineraryId) =>
  await Itinerary.updateOne({ _id: itineraryId }, { comments: comment });

const updateComment = async (id, text) =>
  await Itinerary.findOneAndUpdate({ "comments._id": id }, { $set: { "comments.$.text": text } }, { new: true });

const likeItinerary = async (id, user) => Itinerary.findOneAndUpdate();

module.exports = {
  getAll,
  getOne,
  getByCityId,
  getOneByCommentId,
  getUserLiked,
  create,
  updateComments,
  updateComment,
  likeItinerary,
};
