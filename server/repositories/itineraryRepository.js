const Itinerary = require("../models/ityneraryModel");

// Get
const getAll = async () => await Itinerary.find({});

const getOne = async (id) => await Itinerary.findById(id);

const getByCityId = async (cityId) => await Itinerary.find({ cityId: cityId });

const getUserLiked = async (id, userId) => await Itinerary.findOne({ _id: id, usersLike: userId });

const getLikes = async (id) => Itinerary.findOne({ _id: id }, "likes");

const getOneByCommentId = async (id, userId) =>
  await Itinerary.findOne({ "comments._id": id, "comments.userId": userId });

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

const addUserLike = async (id, user, action) =>
  Itinerary.findOneAndUpdate({ _id: id }, { [action]: { usersLike: user } });

const updateLikes = async (id, likes) =>
  Itinerary.findOneAndUpdate({ _id: id }, { $set: { likes: likes } }, { new: true });

module.exports = {
  getAll,
  getOne,
  getByCityId,
  getOneByCommentId,
  getUserLiked,
  getLikes,
  create,
  updateComments,
  updateComment,
  addUserLike,
  updateLikes,
};
