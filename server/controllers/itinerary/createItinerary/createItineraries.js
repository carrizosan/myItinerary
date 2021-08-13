const { response, Itinerary } = require("../itineraryModule");
const itineraryRepository = require("../../../repositories/itineraryRepository");
const { validationResult } = require("express-validator");

/**
 * Create new itinerary
 * Get itinerary information by request body
 * @returns Status 200: Success, response: new itinerary object
 * @returns Status 500: Internal server error
 */
const create = async (req, res = response) => {
  // Custom validation
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Validations errors",
      error: validations.array(),
    });
  }

  const { title, img, authorName, authorPic, price, duration, comments, cityId } = req.body;

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

    await itineraryRepository.create(newItinerary);

    return res.status(200).json({
      success: true,
      message: "Itinerary created",
      response: newItinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Bad request",
      error,
    });
  }
};

module.exports = { create };
