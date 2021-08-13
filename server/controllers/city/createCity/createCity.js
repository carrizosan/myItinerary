const cityRepository = require("../../../repositories/cityRepository");
const { City, response } = require("../cityModule");
const { validationResult } = require("express-validator");

/**
 * Create new city in database
 * Request body: name, country, img path/url
 * @returns Status 201: Success, response: new city object
 * @returns Status 400: Bad request
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

  const { name, country, img } = req.body;

  // Validates request body
  if (!name || !country || !img) {
    return res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }

  const newCity = new City({ name, country, img });

  try {
    // Validate duplicated city name
    const cityDB = await cityRepository.getCityByQuery(name);

    if (cityDB.length) {
      return res.status(400).json({
        success: false,
        message: "Duplicated record",
        name,
      });
    }

    // Save new city
    await cityRepository.create(newCity);

    return res.status(201).json({
      success: true,
      message: "City created",
      response: newCity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = { create };
