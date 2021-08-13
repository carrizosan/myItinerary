const { response, Itinerary } = require("../itineraryModule");
const itineraryRepository = require("../../../repositories/itineraryRepository");

const create = async (req, res = response) => {
  const { title, img, authorName, authorPic, price, duration, comments, cityId } = req.body;
  console.log(comments);
  try {
    const newItinerary = new Itinerary({
      title,
      img,
      authorName,
      authorPic,
      price,
      duration,
      comments,
      cityId,
    });
    console.log(newItinerary);
    await itineraryRepository.create(newItinerary);

    return res.status(200).json({
      ok: true,
      message: "Itinerary created",
      response: newItinerary,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: "Bad request",
      error,
    });
  }
};

module.exports = { create };
