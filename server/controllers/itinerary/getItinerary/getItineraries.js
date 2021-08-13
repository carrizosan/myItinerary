const itineraryRepository = require("../../../repositories/itineraryRepository");
const { response } = require("../itineraryModule");

/**
 * Get All Itineraries
 * @returns Status 200: Success, response: itineraries array
 * @returns Status 400: No itineraries found, response: empty array
 * @returns Status 500: Internal server error
 */
const getItineraries = async (req, res = response) => {
  try {
    const itinerariesDB = await itineraryRepository.getAll();

    if (!itinerariesDB) {
      return res.status(400).json({
        ok: false,
        message: "",
        response: [],
      });
    }

    res.status(200).json({
      ok: true,
      message: "Itineraries",
      response: itinerariesDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * Get All Itineraries of the requested city
 * @returns Status 200: Success, response: itineraries array
 * @returns Status 400: No itineraries found in the city, response: empty array
 * @returns Status 500: Internal server error
 */
const getItinerariesByCityId = async (req, res = response) => {
  const { id } = req.params;
  try {
    const itinerariesDB = await itineraryRepository.getByCityId(id);

    if (!itinerariesDB) {
      return res.status(400).json({
        ok: false,
        message: "",
        response: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Itineraries",
      response: itinerariesDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  getItineraries,
  getItinerariesByCityId,
};
