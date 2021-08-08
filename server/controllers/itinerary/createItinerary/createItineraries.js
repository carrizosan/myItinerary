const { response, Itinerary } = require("../itineraryModule");
const itineraryRepository = require("../../../repositories/itineraryRepository");

const create = async (req, res = response) => {
  const { title, img, authorName, authorPic, price, duration, cityId } = req.body;

  try {
    const newItinerary = new Itinerary({
      title,
      img,
      authorName,
      authorPic,
      price,
      duration,
      cityId,
    });

    await itineraryRepository.create(newItinerary);

    return res.status(200).json({
      ok: true,
      message: "Itinerary created",
      itinerary: newItinerary,
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
