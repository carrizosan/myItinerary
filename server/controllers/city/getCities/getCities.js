const cityRepository = require("../../../repositories/cityRepository");
const { response } = require("../cityModule");

/**
 * Get All Cities and also City by name (query url)
 * @returns Status 200: Success, response: cities array / city object
 * @returns Status 400: No cities / City not found
 * @returns Status 500: Internal server error
 */
const getCities = async (req, res = response) => {
  const { name } = req.query;
  let citiesDB;
  let total = 0;
  try {
    if (name) {
      citiesDB = await cityRepository.getCityByQuery(name);
    } else {
      citiesDB = await cityRepository.getAll();
      total = await cityRepository.count();
    }

    // Return 400 if no cities found
    if (!citiesDB) {
      return res.status(400).json({
        success: false,
        message: "",
        response: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Cities",
      response: citiesDB,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

/**
 * Get city by Id (Params)
 * @returns Status 200: Success, response: cities array / city object
 * @returns Status 404: City not found
 * @returns Status 500: Internal server error
 */
const getCityById = async (req, res = response) => {
  const { id } = req.params;

  try {
    const cityDB = await cityRepository.getOne(id);

    // Return 404 if city not found
    if (!cityDB) {
      return res.status(404).json({
        success: false,
        message: "Not found",
        response: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "City",
      response: cityDB,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  getCities,
  getCityById,
};
